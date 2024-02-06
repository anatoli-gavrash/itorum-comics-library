import type { User } from "../store/slices/login/login.types";

export interface LocalUser extends User {
  password: string
}

export enum LocalDataKeys {
  CURRENT_USER = 'currentUser',
  USERS_DATA = 'usersData'
}

export type LocalData = LocalCurrentUser | LocalUsersData
export type LocalCurrentUser = number | null
export type LocalUsersData = LocalUser[]

export interface LocalDataStruct {
  [LocalDataKeys.CURRENT_USER]?: LocalCurrentUser,
  [LocalDataKeys.USERS_DATA]?: LocalUsersData,
}

export interface FindUserParams {
  id?: number
  login?: string
  password?: string
  firstname?: string
  lastname?: string
}
