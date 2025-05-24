'use client'
import { useGetApiInsuranceForms } from '../../services/insurance-service/installment.service'

type InsuranceFormsProps = {
  insuranceType: string
}
export const InsuranceForms = ({ insuranceType }: InsuranceFormsProps) => {
  const { data } = useGetApiInsuranceForms()
  console.log(data, insuranceType)
  return <section className="">insurance-form</section>
}
