import { FieldGroupType } from '../type'
import { FormField } from './FormField'

export const FieldGroup: React.FC<{
  group: FieldGroupType
  control: any
  allValues: any
  errors?: any
  groupId?: string
}> = ({ group, control, allValues, errors, groupId }) => (
  <fieldset className="mb-6 p-4 border border-gray-300 rounded-lg">
    <legend className="text-lg font-semibold mb-2 ">{group.label}</legend>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {group.fields.map(field => (
        <FormField
          key={field.id}
          field={field}
          control={control}
          allValues={allValues}
          errors={errors?.[field.id]}
          groupId={groupId}
        />
      ))}
    </div>
  </fieldset>
)
