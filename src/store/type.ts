import { ILoginState } from './login/type'

export interface Continuous {
  count?: number
  ticket: boolean
  diamond: boolean
  fail: boolean
  find: boolean
  open: boolean
}
export interface Task {
  id: string
  strs?: string[]
  type?: string
  property?: string
  floor?: string
  count?: number
  continuous?: Continuous
  interval?: number
  before?: boolean
  checked?: string[]
}

export interface Config {
  tasks: Task[]
  schedules: Task[]
  shopping?: string
}

export interface IRootState {
  config: Config
}

export interface IModuleState {
  login: ILoginState
}

export interface IState extends IRootState, IModuleState {}
