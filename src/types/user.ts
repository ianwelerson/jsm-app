import type { DateFormat } from './general'

export interface UserPictures {
  large: string
  medium: string
  thumbnail: string
}

export interface UserLocation {
  street: string
  city: string
  state: string
  postcode: number
  coordinates: {
    latitude: string
    longitude: string
  }
  timezone: {
    offset: string
    description: string
  }
}

export interface UserName {
  title: string
  first: string
  last: string
}

export interface UserData {
  id: string
  name: UserName
  gender: string
  picture: UserPictures
  location: UserLocation
  email: string
  dob: DateFormat
  registered: DateFormat
  phone: string
  cell: string
}

export interface UserSortOptions {
  name: string
  value: keyof UserListData
}

export interface UserListData {
  id: string
  picture: string
  name: string
  street: string
  city: string
  state: string
  postcode: number
}

export interface UserListResponse {
  users: UserListData[]
  totalPages: number
  totalUsers: number
  currentPage: number
}
