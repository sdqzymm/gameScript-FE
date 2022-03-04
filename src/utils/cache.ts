import { isPlainObject } from './helps'

interface Options {
  includes?: string[]
  excludes?: string[]
}

class LocalCache {
  setCache(obj: Record<string, any>, options?: Options): void

  setCache(key: string, value: any): void

  setCache(val1: string | Record<string, any>, val2?: any): void {
    if (isPlainObject(val1)) {
      val2 = val2 ?? {}
      const { includes, excludes } = val2 as Options
      Object.entries(val1)
        .filter(([key]) => {
          return includes ? includes.includes(key) : true
        })
        .filter(([key]) => {
          return excludes ? !excludes.includes(key) : true
        })
        .forEach(([key, value]) => {
          window.localStorage.setItem(key, JSON.stringify(value))
        })
    } else if (typeof val1 === 'string') {
      window.localStorage.setItem(val1, JSON.stringify(val2))
    } else {
      if (!isPlainObject(val1)) {
        const message = '第一个参数只接收纯对象'
        // async-validator三方库的validate回调函数中无法抛出异常
        console.log(message)
        throw new Error(message)
      }
    }
  }

  getCache(key: string): any

  getCache(keys: string[]): Record<string, any>

  getCache(val: string | string[]): Record<string, any> {
    let keys: string[]
    if (!Array.isArray(val)) {
      keys = [val]
    } else {
      keys = val
    }
    const res: Record<string, any> = {}
    keys.forEach((key) => {
      const value = window.localStorage.getItem(key)
      if (value) res[key] = JSON.parse(value)
    })
    if (Array.isArray(val)) return res
    return res[val]
  }

  deleteCache(obj: Record<string, any>, options?: Options): void

  deleteCache(keys: string[]): void

  deleteCache(val: string[] | Record<string, any>, options?: Options): void {
    if (Array.isArray(val)) {
      val.forEach((key) => {
        window.localStorage.removeItem(key)
      })
    } else if (isPlainObject(val)) {
      options = options ?? {}
      const { includes, excludes } = options
      Object.keys(val)
        .filter((key) => {
          return includes ? includes.includes(key) : true
        })
        .filter((key) => {
          return excludes ? !excludes.includes(key) : true
        })
        .forEach((key) => {
          window.localStorage.removeItem(key)
        })
    }
  }

  clearCache(): void {
    window.localStorage.clear()
  }
}

export default new LocalCache()
