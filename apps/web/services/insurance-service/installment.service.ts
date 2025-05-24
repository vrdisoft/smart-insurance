import { useMutation, useQuery } from '@tanstack/react-query'
import type {
  MutationFunction,
  QueryFunction,
  QueryKey,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query'

import { InsuranceForms } from './insurance.schemas'
import { customInstance } from '../../utils/custom-instance'
type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1]

export const getApiInsuranceForms = (options?: SecondParameter<typeof customInstance>, signal?: AbortSignal) => {
  return customInstance<InsuranceForms[]>({ url: `/api/insurance/forms`, method: 'GET', signal }, options)
}

export const getGetApiInsuranceFormsQueryKey = () => {
  return [`/api/insurance/forms`] as const
}

export const getGetApiInsuranceFormsQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiInsuranceForms>>,
  TError = string,
>(options?: {
  query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiInsuranceForms>>, TError, TData>>
  request?: SecondParameter<typeof customInstance>
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getGetApiInsuranceFormsQueryKey()

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiInsuranceForms>>> = ({ signal }) =>
    getApiInsuranceForms(requestOptions, signal)

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiInsuranceForms>>,
    TError,
    TData
  > & { queryKey: QueryKey }
}

export type GetApiInsuranceFormsQueryResult = NonNullable<Awaited<ReturnType<typeof getApiInsuranceForms>>>
export type GetApiInsuranceFormsQueryError = string

export const useGetApiInsuranceForms = <
  TData = Awaited<ReturnType<typeof getApiInsuranceForms>>,
  TError = string,
>(options?: {
  query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiInsuranceForms>>, TError, TData>>
  request?: SecondParameter<typeof customInstance>
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getGetApiInsuranceFormsQueryOptions(options)

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

  query.queryKey = queryOptions.queryKey

  return query
}
