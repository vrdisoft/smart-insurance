import Axios, { AxiosError, AxiosRequestConfig } from 'axios'
import toast from 'react-hot-toast'

const baseURL = process.env.NEXT_PUBLIC_API_URL
const axiosInstance = Axios.create({ baseURL })

axiosInstance.interceptors.request.use(
  //@ts-ignore
  async config => {
    if (config.headers) {
      const xRealIP = config.headers['x-real-ip']
      const xForwardedFor = config.headers['x-forwarded-for']

      if (xRealIP) config.headers['x-real-ip'] = xRealIP
      if (xForwardedFor) config.headers['x-forwarded-for'] = xForwardedFor
    }

    return config
  },
  (error: AxiosError) => {
    console.warn(error)
  },
)

const customInstance = <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
  const promise = axiosInstance({
    ...config,
    ...options,
  })
    //@ts-ignore
    .then(({ data }) => {
      return data
    })
    //@ts-ignore
    .catch(error => {
      if (typeof window !== 'undefined' && Number(error?.response?.status)) {
        const expectedError =
          error?.response?.status && Number(error?.response?.status) >= 400 && Number(error?.response?.status) < 500
      }
      return Promise.reject(error?.response?.data)
    })
  return promise
}
type ErrorType<Error> = AxiosError<Error>

type BodyType<BodyData> = BodyData

export { axiosInstance, customInstance }
export type { BodyType, ErrorType }
