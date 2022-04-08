export interface Account {
  name: string
  password: string
}

export interface AccountLoginData {
  id: number
  token: string
  name: string
  tasks: string
  schedules: string
  daily: string
  shopping: string
  simulator: boolean
  print: boolean
  vip: boolean
}

// 这些数据接口如果有空以后再写(业务代码中已经导入使用)
export interface UserInfo {
  id?: number
  name?: string
  vip?: boolean
  [key: string]: any
}
