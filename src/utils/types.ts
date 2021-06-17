export type Car = {
  id: number
  plate: string
  brand: string
  color: string
  renavam: string
}

export type Driver = {
  id: number
  name: string
  status: boolean
}

export type Fine = {
  id: number
  aitCode: string
  moment: string
  car: Car
  driver: Driver
  infraction: Infraction
}

export type Infraction = {
  id: number
  description: string
  amount: number
  type: string
}