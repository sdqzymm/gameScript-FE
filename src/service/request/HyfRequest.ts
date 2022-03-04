import axios, {
  AxiosInstance,
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse,
  Method
} from 'axios'
import mergeConfig from 'axios/lib/core/mergeConfig'
import { ElMessage } from 'element-plus'

import defaults, { DEFAULT_INTERCEPTOR, LOADING } from './config'
import {
  defaultResponseInterceptors,
  defaultRequestInterceptors,
  loadingRequestInterceptors,
  loadingResponseInterceptors
} from './interceptors'
import type { HyfRequestConfig, Interceptors } from './type'

class HyfRequest {
  instance: AxiosInstance
  config: HyfRequestConfig
  private _requestConfig?: HyfRequestConfig

  constructor(config?: HyfRequestConfig) {
    this.config = config = mergeConfig(defaults, config)

    this.instance = axios.create(config)

    this._useInterceptors(this.config)
  }

  request<T = AxiosResponse>(config: HyfRequestConfig<T>): Promise<T> {
    this._processConfig(config)
    this._requestConfig = config as any
    return this.instance.request<any, T>(config)
  }

  get<T = AxiosResponse>(
    url: string,
    config?: HyfRequestConfig<T>
  ): Promise<T> {
    return this._requestMethodWithoutData<T>('get', url, config)
  }

  delete<T = AxiosResponse>(
    url: string,
    config?: HyfRequestConfig<T>
  ): Promise<T> {
    return this._requestMethodWithoutData<T>('delete', url, config)
  }

  post<T = AxiosResponse<any>>(
    url: string,
    data?: any,
    config?: HyfRequestConfig<T>
  ): Promise<T> {
    return this._requestMethodWithData<T>('post', url, data, config)
  }

  put<T = AxiosResponse<any>>(
    url: string,
    data?: any,
    config?: HyfRequestConfig<T>
  ): Promise<T> {
    return this._requestMethodWithData<T>('put', url, data, config)
  }

  patch<T = AxiosResponse<any>>(
    url: string,
    data?: any,
    config?: HyfRequestConfig<T>
  ): Promise<T> {
    return this._requestMethodWithData<T>('patch', url, data, config)
  }

  private _requestMethodWithoutData<T>(
    method: Method,
    url: string,
    config?: HyfRequestConfig<T>
  ): Promise<T> {
    return this.request<T>(
      Object.assign(config || {}, {
        method,
        url
      })
    )
  }

  private _requestMethodWithData<T>(
    method: Method,
    url: string,
    data?: any,
    config?: HyfRequestConfig<T>
  ): Promise<T> {
    return this.request<T>(
      Object.assign(config || {}, {
        method,
        url,
        data
      })
    )
  }

  private _useInterceptors(config: HyfRequestConfig) {
    // 请求拦截器顺序, 后添加的先执行
    // 响应拦截器顺序, 后添加的后执行
    // 这里的顺序是 显示loading -> 实例请求拦截 -> 默认请求拦截 -> 默认响应拦截 -> 实例响应拦截 -> 关闭loading
    // 说明: 给具体的请求设置拦截器没有什么意义, 要改变config, 直接改好传进去就行, 要改response, 直接在then中写具体的逻辑就行(而且还有transformRequest, transformResponse这两优先于拦截器的方法), 所以我们不会对单个请求设置拦截器
    const {
      requestInterceptors,
      responseInterceptors,
      loading,
      defaultInterceptor
    } = config

    this._useInterceptorIfNeeded(
      defaultInterceptor!,
      'defaultInterceptor',
      defaultRequestInterceptors,
      defaultResponseInterceptors
    )

    this.instance.interceptors.request.use(
      requestInterceptors?.resolved,
      requestInterceptors?.rejected
    )

    this.instance.interceptors.response.use(
      responseInterceptors?.resolved,
      responseInterceptors?.rejected
    )

    this._useInterceptorIfNeeded(
      loading!,
      'loading',
      loadingRequestInterceptors,
      loadingResponseInterceptors
    )
  }

  private _useInterceptorIfNeeded(
    needed: boolean,
    key: 'loading' | 'defaultInterceptor',
    requestInterceptors: Interceptors,
    responseInterceptors: Interceptors<AxiosResponse<any>>
  ): void {
    // 这里要考虑在实际请求的时候可能会改变defaultInterceptor和loading的值, 最终我们要根据实际请求时的这两个值来判断
    useInterceptorIfNeeded<AxiosRequestConfig>(
      needed,
      this.instance.interceptors.request,
      this,
      key,
      requestInterceptors
    )

    useInterceptorIfNeeded<AxiosResponse>(
      needed,
      this.instance.interceptors.response,
      this,
      key,
      responseInterceptors
    )

    function useInterceptorIfNeeded<T>(
      needed: boolean,
      interceptorManager: AxiosInterceptorManager<T>,
      context: HyfRequest,
      key: 'loading' | 'defaultInterceptor',
      interceptors: Interceptors<T>
    ) {
      needed &&
        interceptorManager.use(
          (value) => {
            if (context._requestConfig![key] && interceptors.resolved) {
              return interceptors.resolved(value)
            }
            return value
          },
          (err) => {
            if (context._requestConfig![key] && interceptors.rejected) {
              return interceptors.rejected(err)
            }
            return err
          }
        )
    }
  }

  private _processConfig<T>(config: HyfRequestConfig<T>): void {
    config.loading ?? (config.loading = LOADING)
    config.defaultInterceptor ??
      (config.defaultInterceptor = DEFAULT_INTERCEPTOR)

    // 当请求设置了loading和defaultInterceptor而实例上并没有这两类拦截器时, 弹出警告
    if (config.loading && !this.config.loading) {
      ElMessage.warning({
        message: '当前请求要显示loading, 但是请求实例上设置为false, 请检查'
      })
    }
    if (config.defaultInterceptor && !this.config.defaultInterceptor) {
      ElMessage.warning({
        message: '当前请求要使用默认拦截器, 但是请求实例上设置为false, 请检查'
      })
    }
  }
}

export default HyfRequest
