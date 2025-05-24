'use client'
import { useGetApiInsuranceForms } from '../../services/insurance-service/installment.service'
import { DynamicForm } from './component/DynamicForm'

type InsuranceFormsProps = {
  insuranceType: string
}
export const InsuranceForms = ({ insuranceType }: InsuranceFormsProps) => {
  const { data, isLoading } = useGetApiInsuranceForms()

  const schema = data?.find(form => form.formId.includes(insuranceType))

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
        <span className="ml-4 text-gray-500 text-lg">Loading...</span>
      </div>
    )
  }
  return <section className="">{schema && <DynamicForm schema={schema as any} />}</section>
}
