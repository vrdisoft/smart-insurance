import { MainLayout } from '../layout/mainLayout/index'

const NotFound = async () => {
  return (
    <MainLayout>
      <section id="notFound" className="flex flex-col gap-12 container max-w-[1224px] mx-auto md:px-4 xl:px-0 md:pt-4">
        Not Found
      </section>
    </MainLayout>
  )
}

export default NotFound
