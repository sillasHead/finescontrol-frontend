import axios from 'axios'
import { Car, Driver, Fine, Infraction } from './types'

export const api = axios.create({
  baseURL: 'http://localhost:8080/',
})
