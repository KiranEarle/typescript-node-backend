export interface IUserDetails {
  username: string
  firstName: string
  lastName: string
  type: string
}

export interface IProposition {
  title: string
  description: string
  price: string
  estimatedTime: string
}

export interface ICreateFoodRequest {
  title: string
  description: string
  userDetails: {
    username: string
    firstName: string
    lastName: string
    type: string
  }
}

export interface IAcceptFoodRequest {
  cookUserDetails: {
    username: string
    firstName: string
    lastName: string
    type: string
  }
  requestSessionId: string
  proposition:{
    title: string
    description: string
    price: string
    estimatedTime: string
  }
}