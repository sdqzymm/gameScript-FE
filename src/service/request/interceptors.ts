import { ElLoading } from 'element-plus'
import { AxiosResponse, AxiosError } from 'axios'
import type { Interceptors } from './type'
import { ElMessage, ElMessageBox } from 'element-plus'

import * as constants from './constants'
import localCache from '@/utils/cache'
import router from '@/router'

const defaultRequestInterceptors: Interceptors = {
  resolved(config) {
    // todo: tokens写入headers
    const token = localCache.getCache('token')
    if (token) {
      config.headers!.Authorization = `Bearer ${token}`
    }
    return config
  },
  rejected(err) {
    return err
  }
}

const defaultResponseInterceptors: Interceptors<AxiosResponse<any>> = {
  resolved(val) {
    // axios默认的validateStatus校验规则仅在状态码为2xx的时候到这
    return val.data
  },
  rejected(err: AxiosError<any>) {
    let message: string
    let errStatus = 400

    if (err.request.status === 0) {
      // 处理请求超时或者网络错误
      message = err.message.toLowerCase()
      errStatus = 0
      if (message.includes('network error')) {
        message = constants.NETWORK_ERROR
      } else if (message.includes('timeout')) {
        message = constants.TIMEOUT
      }
    } else {
      // 处理4xx, 5xx状态码(3xx重定向浏览器自动处理)
      const res = processMessage(err.response!.status, err.response)
      message = res.message
      errStatus = res.code
      if (!message) message = err.message
    }

    if (constants.TO_LOGIN.includes(errStatus)) {
      ElMessageBox.confirm(message, '提醒', {
        confirmButtonText: '登录',
        cancelButtonText: '关闭',
        type: 'warning'
      }).then(() => {
        router.push('/login')
      })
    }
    // else if (constants.RETRY.includes(errStatus)) {
    //   // todo: 尝试重新请求(若配置)
    // }
    else {
      return createErrMessage(message)
    }
  }
}

function processMessage(status: number, response: any): any {
  let message: string
  switch (status) {
    case 400:
      message = constants.ERR_400
      break
    case 401:
      message = constants.ERR_401
      break
    case 403:
      message = constants.ERR_403
      break
    case 404:
      message = constants.ERR_404
      break
    case 405:
      message = constants.ERR_405
      break
    case 500:
      message = constants.ERR_500
      break
    case 501:
      message = constants.ERR_501
      break
    case 502:
      message = constants.ERR_502
      break
    case 503:
      message = constants.ERR_503
      break
    case 504:
      message = constants.ERR_504
      break
    case 505:
      message = constants.ERR_505
      break
    default:
      message = ''
      break
  }
  return {
    message: response.data ?? message,
    code: status
  }
}

function createErrMessage(message: string) {
  ElMessage.error({ message })
  return message
}

let loadingInstance: any
let reqCount = 0

const loadingRequestInterceptors: Interceptors = {
  resolved(config) {
    reqCount++
    setTimeout(() => {
      if (reqCount != 0) {
        loadingInstance = ElLoading.service({
          lock: true,
          text: 'loading',
          background: 'rgba(0, 0, 0, 0.5)'
        })
      }
    }, 200)
    return config
  }
}

const loadingResponseInterceptors: Interceptors<AxiosResponse<any>> = {
  resolved(val) {
    reqCount--
    if (reqCount === 0 && loadingInstance) loadingInstance.close()
    return val
  },
  rejected(err) {
    reqCount--
    if (reqCount === 0 && loadingInstance) loadingInstance.close()
    return err
  }
}

export {
  defaultRequestInterceptors,
  defaultResponseInterceptors,
  loadingRequestInterceptors,
  loadingResponseInterceptors
}
