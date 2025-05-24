export type FieldType = 'text' | 'date' | 'select' | 'radio' | 'group' | 'number' | 'checkbox'

export interface VisibilityCondition {
  dependsOn: string
  condition: 'equals'
  value: string
}

export interface DynamicOptions {
  dependsOn: string
  endpoint: string
  method: 'GET'
}

export interface BaseField {
  id: string
  label: string
  type: FieldType
  required?: boolean
  visibility?: VisibilityCondition
  validation?: {
    min?: number
    max?: number
    pattern?: string
  }
}

export interface InputField extends BaseField {
  type: 'text' | 'date' | 'number'
}

export interface SelectField extends BaseField {
  type: 'select'
  options?: string[]
  dynamicOptions?: DynamicOptions
}

export interface RadioField extends BaseField {
  type: 'radio' | 'checkbox'
  options: string[]
}

export interface FieldGroupType extends BaseField {
  type: 'group'
  fields: FormFieldType[]
}

export type FormFieldType = InputField | SelectField | RadioField | FieldGroupType

export interface FormSchema {
  formId: string
  title: string
  fields: FormFieldType[]
}
