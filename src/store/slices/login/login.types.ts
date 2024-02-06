export interface Login {
  currentUser: User | null | undefined
}

export interface User {
  id: number
  login: string
  firstname: string
  lastname: string
  avatar: string
  favorites: UserStorage[] | null
  purchases: UserStorage[] | null
}

export interface UserStorage {
  id: number,
  title: string
}
