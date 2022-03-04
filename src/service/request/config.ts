const BASE_URL_DEV = '/api'
const BASE_URL_PRO = 'http://47.96.69.41:8888'
const BASE_URL_TEST = 'oo'
const TIMEOUT = 1000
const WITH_CREDENTIALS = false // 跨域携带cookie
const DEFAULT_INTERCEPTOR = true // 默认拦截器
const LOADING = true // 默认显示loading

let baseURL = ''

const node_env = process.env.NODE_ENV

if (node_env === 'development') {
  baseURL = BASE_URL_DEV
} else if (node_env === 'production') {
  baseURL = BASE_URL_PRO
} else if (node_env === 'test') {
  baseURL = BASE_URL_TEST
}

const defaults = {
  baseURL,
  timeout: TIMEOUT,
  withCredentials: WITH_CREDENTIALS,
  defaultInterceptor: DEFAULT_INTERCEPTOR,
  loading: LOADING
}

export default defaults
export { DEFAULT_INTERCEPTOR, LOADING }
