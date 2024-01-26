export interface Login {
  currentUser: User | null
}

export interface User {
  id: number
  login: string
  firstname: string
  lastname: string
  avatar: string
  purchases: [number] | null
}
