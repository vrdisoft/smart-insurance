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

import { InsuranceForms, InsuranceFormsSubmissions } from './insurance.schemas'
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

export const postApiInsuranceFormsSubmit = (
  InsuranceFormsSubmitModel: any,
  options?: SecondParameter<typeof customInstance>,
) => {
  return customInstance<any>(
    {
      url: `/api/insurance/forms/submit`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json-patch+json' },
      data: InsuranceFormsSubmitModel,
    },
    options,
  )
}

export const getPostApiInsuranceFormsSubmitMutationOptions = <TError = string, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiInsuranceFormsSubmit>>,
    TError,
    { data: any },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<Awaited<ReturnType<typeof postApiInsuranceFormsSubmit>>, TError, { data: any }, TContext> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {}

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postApiInsuranceFormsSubmit>>,
    { data: any }
  > = props => {
    const { data } = props ?? {}

    return postApiInsuranceFormsSubmit(data, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type PostApiInsuranceFormsSubmitMutationResult = NonNullable<
  Awaited<ReturnType<typeof postApiInsuranceFormsSubmit>>
>
export type PostApiInsuranceFormsSubmitMutationBody = any
export type PostApiInsuranceFormsSubmitMutationError = string

export const usePostApiInsuranceFormsSubmit = <TError = string, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postApiInsuranceFormsSubmit>>,
    TError,
    { data: any },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationResult<Awaited<ReturnType<typeof postApiInsuranceFormsSubmit>>, TError, { data: any }, TContext> => {
  const mutationOptions = getPostApiInsuranceFormsSubmitMutationOptions(options)

  return useMutation(mutationOptions)
}

export const getApiInsuranceFormsSubmissions = (
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  return customInstance<InsuranceFormsSubmissions>(
    { url: '/api/insurance/forms/submissions', method: 'GET', signal },
    options,
  )
}

export const getGetApiInsuranceFormsSubmissionsQueryKey = () => {
  return [`/api/insurance/forms/submissions`] as const
}

export const getGetApiInsuranceFormsSubmissionsQueryOptions = <
  TData = Awaited<ReturnType<typeof getApiInsuranceFormsSubmissions>>,
  TError = string,
>(options?: {
  query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiInsuranceFormsSubmissions>>, TError, TData>>
  request?: SecondParameter<typeof customInstance>
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {}

  const queryKey = queryOptions?.queryKey ?? getGetApiInsuranceFormsSubmissionsQueryKey()

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiInsuranceFormsSubmissions>>> = ({ signal }) =>
    getApiInsuranceFormsSubmissions(requestOptions, signal)

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getApiInsuranceFormsSubmissions>>,
    TError,
    TData
  > & { queryKey: QueryKey }
}

export type GetApiInsuranceFormsSubmissionsQueryResult = NonNullable<
  Awaited<ReturnType<typeof getApiInsuranceFormsSubmissions>>
>
export type GetApiInsuranceFormsSubmissionsQueryError = string

export const useGetApiInsuranceFormsSubmissions = <
  TData = Awaited<ReturnType<typeof getApiInsuranceFormsSubmissions>>,
  TError = string,
>(options?: {
  query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiInsuranceFormsSubmissions>>, TError, TData>>
  request?: SecondParameter<typeof customInstance>
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getGetApiInsuranceFormsSubmissionsQueryOptions(options)

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

  query.queryKey = queryOptions.queryKey

  return query
}
