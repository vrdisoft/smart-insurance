'use client'
import { useEffect } from 'react'
import { useGetApiInsuranceForms } from '../../services/insurance-service/installment.service'
import { DynamicForm } from './component/DynamicForm'

type InsuranceFormsProps = {
  insuranceType: string
}
export const InsuranceForms = ({ insuranceType }: InsuranceFormsProps) => {
  const { data, isLoading } = useGetApiInsuranceForms()

  const schema = data?.find(form => form.formId.includes(insuranceType))

  const addCountry = () => {
    const healthForm = data?.find(form => form.formId === 'health_insurance_application')
    const homeForm = data?.find(form => form.formId === 'home_insurance_application')

    const healthAddressGroup = healthForm?.fields?.find(field => field.id === 'address')
    const countryField = healthAddressGroup?.fields?.find(field => field.id === 'country')

    const homeAddressGroup = homeForm?.fields?.find(field => field.id === 'home_address')

    const alreadyExists = homeAddressGroup?.fields?.some(field => field.id === 'country')

    if (!alreadyExists) {
      homeAddressGroup?.fields?.unshift(JSON.parse(JSON.stringify(countryField)))
    }
  }

  useEffect(() => {
    if (data) {
      addCountry()
    }
  }, [data])

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
