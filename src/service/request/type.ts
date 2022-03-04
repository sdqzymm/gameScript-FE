import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface ResolvedFn<T> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}

export interface Interceptors<T = HyfRequestConfig> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

export interface HyfRequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  requestInterceptors?: Interceptors
  responseInterceptors?: Interceptors<T>
  loading?: boolean
  defaultInterceptor?: boolean
}
