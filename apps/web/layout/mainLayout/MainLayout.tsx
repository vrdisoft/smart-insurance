import { ReactNode } from 'react'
import { Header } from './components/Header'

export const MainLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main className="pt-24 pb-6 px-8">{children}</main>
      <footer></footer>
    </>
  )
}
