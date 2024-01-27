export interface Login {
  currentUser: User | null | undefined
}

export interface User {
  id: number
  login: string
  firstname: string
  lastname: string
  avatar: string
  favorites: number[] | null
  purchases: number[] | null
}
