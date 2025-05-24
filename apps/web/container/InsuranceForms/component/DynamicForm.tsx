import { FormProvider, useForm } from 'react-hook-form'
import { FormFieldType, FormSchema } from '../type'
import { FieldGroup } from './FieldGroup'
import { FormField } from './FormField'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { usePostApiInsuranceFormsSubmit } from '../../../services/insurance-service/installment.service'
import toast from 'react-hot-toast'

type DynamicFormProps = {
  schema: FormSchema
}

const buildYupSchema = (fields: FormFieldType[]): yup.AnyObjectSchema => {
  const shape: Record<string, any> = {}

  const flattenFields = (fields: FormFieldType[]) => {
    fields.forEach(field => {
      const key = field.id

      if (field.type === 'group') {
        flattenFields(field.fields)
      } else {
        let validator: any = yup.string()
        if (field.type === 'date') {
          validator = yup.date().typeError('Invalid date')
        }
        if (field.type === 'checkbox') {
          validator = yup.array().typeError('Invalid data type for checkbox')
        }

        if (field.type === 'number') {
          validator = yup.number().typeError('Must be a number')
          if (field.validation?.min !== undefined) {
            validator = validator.min(field.validation.min, `Minimum value is ${field.validation.min}`)
          }
          if (field.validation?.max !== undefined) {
            validator = validator.max(field.validation.max, `Maximum value is ${field.validation.max}`)
          }
        }

        if (field.validation?.pattern) {
          validator = validator.matches(new RegExp(field.validation.pattern), 'Invalid format')
        }
        if (field.required) {
          if (!field.visibility) {
            validator = validator.required('This field is required')
          } else {
            validator = validator.when(field.visibility.dependsOn, {
              is: (val: any) => {
                return val == field?.visibility?.value && field?.visibility?.condition === 'equals'
              },
              then: (schema: any) => schema.required('This field is required'),
            })
          }
        }

        shape[key] = validator
      }
    })
  }

  flattenFields(fields)

  return yup.object().shape(shape)
}

export const DynamicForm: React.FC<DynamicFormProps> = ({ schema }) => {
  const { mutateAsync: postInsuranceFormsSubmit } = usePostApiInsuranceFormsSubmit()
  const yupSchema = buildYupSchema(schema.fields)
  const formProvider = useForm({
    resolver: yupResolver(yupSchema),
    mode: 'onTouched',
  })

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = formProvider

  const onSubmit = (data: any) => {
    postInsuranceFormsSubmit({ data }).then(response => {
      if (response.status === 'success') {
        toast.success(response.message, { duration: 6000, className: 'top-20' })
        formProvider.reset({})
      }
    })
  }

  const allValues = watch()

  return (
    <FormProvider {...formProvider}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow"
      >
        <h1 className="text-2xl font-bold mb-6">{schema.title}</h1>
        <div className="flex w-full flex-wrap ">
          {schema.fields.map(field =>
            field.type === 'group' ? (
              <div className="min-w-full" key={field.id}>
                <FieldGroup
                  group={field}
                  control={control}
                  allValues={allValues}
                  errors={errors}
                  //groupId={field.id}
                />
              </div>
            ) : (
              <div className="min-w-1/2 px-2" key={field.id}>
                <FormField field={field} control={control} allValues={allValues} errors={errors?.[field.id]} />
              </div>
            ),
          )}
        </div>
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Submit
        </button>
      </form>
    </FormProvider>
  )
}
