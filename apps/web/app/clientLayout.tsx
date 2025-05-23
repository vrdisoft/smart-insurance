'use client'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import { QueryProviders } from '../context/QueryClientProvider'

export const ClientLayout = ({ children }: { children: ReactNode }): ReactNode => {
  return (
    <QueryProviders>
      <Toaster containerStyle={{ zIndex: 9999999999999 }} />
      <div className="relative bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
        {children}
      </div>
    </QueryProviders>
  )
}
