import type { UserInfo } from '@/service'

export interface ILoginState {
  token: string
  userInfo: UserInfo
}
