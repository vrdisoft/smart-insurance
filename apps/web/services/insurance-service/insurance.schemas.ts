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

export type InsuranceFormsSubmissions = {
  columns: string[]
  data: UsersApplications[]
}

export type UsersApplications = {
  id: number
  'Full Name': string
  Age: number
  Gender: string
  'Insurance Type': string
  City: string
}
