'use client'

import { defaultShouldDehydrateQuery, isServer, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
      },
      dehydrate: {
        shouldDehydrateQuery: query => defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined

const getQueryClient = () => {
  if (isServer) {
    return makeQueryClient()
  }
  if (!browserQueryClient) browserQueryClient = makeQueryClient()
  return browserQueryClient
}

export const QueryProviders = ({ children }: { children: ReactNode }) => {
  const queryClient = getQueryClient()

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
