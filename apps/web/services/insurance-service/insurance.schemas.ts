export type InsuranceForms = {
  formId: string
  title: string
  fields?: Field[]
}

export type Field = {
  id: string
  label: string
  type: string
  required?: boolean
  options?: string[]
  dynamicOptions?: DynamicOptions
  visibility?: Visibility
  fields?: Field[]
}

export type DynamicOptions = {
  dependsOn: string
  endpoint: string
  method: string
}

export type Visibility = {
  dependsOn: string
  condition: string
  value: string
}
