import hyfRequest from '..'
import { APIData } from '../type'
import { Account, AccountLoginData } from './type'

enum LoginAPI {
  AccountLogin = '/login',
  AccountRegister = '/user',
  UserInfo = '/user/',
  BindCode = 'code/bind'
}

export function accountLoginRequest(account: Account) {
  return hyfRequest.post<APIData<AccountLoginData>>(
    LoginAPI.AccountLogin,
    account
  )
}

export function updateUser(id: number, data: any) {
  return hyfRequest.patch<APIData>(`${LoginAPI.UserInfo}${id}`, data)
}

export function bindCode(code: string, id: number) {
  return hyfRequest.patch<APIData>(`${LoginAPI.BindCode}`, {
    code,
    id
  })
}

export function register(account: any) {
  return hyfRequest.post<APIData>(LoginAPI.AccountRegister, account)
}
