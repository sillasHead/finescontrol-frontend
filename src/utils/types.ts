export type Car = {
  id: number
  plate: string
  name: string
  renavam: string
  status?: boolean
}

export type Driver = {
  id: number
  name: string
  status?: boolean
  fines?: Fine[]
}

export type Fine = {
  id?: number
  aitCode: string
  moment: Date
  dueDate: Date
  paymentDate: Date
  identifiedDriver: boolean
  amount: number
  car: Car
  driver: Driver
  infraction: Infraction
}

export type Infraction = {
  id: number
  description: string
  amount: number
  type: string
  rating: number
}