import { useEffect, useState } from 'react'
import { FormFieldType, SelectField } from '../type'
import {
  CheckboxListController,
  DatePickerController,
  InputController,
  Option,
  RadioGroupController,
  SelectController,
} from '@repo/ui'
import { customInstance } from '../../../utils/custom-instance'

export const FormField: React.FC<{
  field: FormFieldType
  control: any
  allValues: any
  errors?: any
  groupId?: string
}> = ({ field, control, allValues, errors, groupId }) => {
  const [options, setOptions] = useState<Option[]>([])

  const watchDep = allValues[(field as SelectField)?.dynamicOptions?.dependsOn ?? '']
  const id = field.id
  const name = groupId ? `${groupId}.${id}` : id

  useEffect(() => {
    if ((field as SelectField).options) {
      const staticOptions = (field as SelectField)?.options?.map(opt => ({
        value: opt,
        label: opt,
      }))
      setOptions(staticOptions ?? [])
    }

    const dyn = (field as SelectField).dynamicOptions
    console.log('watchDep', watchDep, dyn?.endpoint)
    if (dyn && watchDep) {
      customInstance<any>({
        url: `${process.env.NEXT_PUBLIC_API_URL}${dyn.endpoint}`,
        method: 'GET',
        params: { [dyn.dependsOn]: watchDep },
      })
        .then(res => {
          const dynamicOptions = res[`${id}s`]?.map((opt: string) => ({
            value: opt,
            label: opt,
          }))
          setOptions(dynamicOptions ?? [])
        })
        .catch(() => setOptions([]))
    }
  }, [watchDep])

  const dependsOnValue = allValues[field?.visibility?.dependsOn ?? '']
  const visible =
    !field.visibility || (field.visibility.condition === 'equals' && dependsOnValue === field.visibility.value)

  if (!visible) return null

  const renderElement = () => {
    switch (field.type) {
      case 'text':
        return (
          <InputController
            name={name}
            label={field.label}
            control={control}
            labelRequired={field.required}
            error={errors?.message}
          />
        )
      case 'select':
        return (
          <SelectController
            name={name}
            label={field.label}
            options={options}
            onChange={() => {}}
            control={control}
            labelRequired={field.required}
            error={errors?.message}
          />
        )
      case 'radio':
        return (
          <RadioGroupController
            name={name}
            label={field.label}
            control={control}
            required={field.required}
            error={errors?.message}
            options={options}
          />
        )
      case 'number':
        return (
          <InputController
            name={name}
            label={field.label}
            control={control}
            labelRequired={field.required}
            error={errors?.message}
            type="number"
          />
        )
      case 'checkbox':
        return (
          <CheckboxListController
            name={name}
            label={field.label}
            control={control}
            required={field.required}
            error={errors?.message}
            data={options}
          />
        )
      case 'date':
        return (
          <DatePickerController
            name={name}
            label={field.label}
            control={control}
            required={field.required}
            error={errors?.message}
          />
        )
      default:
        return null
    }
  }

  return <div className="mb-6">{renderElement()}</div>
}
