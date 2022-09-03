export interface UserData {
  id: string
  picture: string
  name: string
  street: string
  city: string
  state: string
  postcode: number
}

export interface UserListResponse {
  users: UserData[]
  totalPages: number
  totalUsers: number
  currentPage: number
}
