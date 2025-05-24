import { InsuranceForms } from '../../../../container/InsuranceForms'

type Params = Promise<{ insuranceType: string }>
type PageProps = {
  params: Params
}

const Home = async ({ params }: PageProps) => {
  const { insuranceType } = await params
  return <InsuranceForms insuranceType={insuranceType} />
}
export default Home
