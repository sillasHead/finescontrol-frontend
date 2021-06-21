import axios from 'axios'
import { Car, Driver, Fine, Infraction } from './types'

export const api = axios.create({
  baseURL: 'http://localhost:8080/',
})

export function getCars(setCars: (cars: Car[]) => void) {
  api.get('carros')
    .then(response => {
      setCars(response.data)
    })
    .catch(error => {
      alert('Erro')
      console.log('api.get(carros) => ', error)
    })
} 

export function getDrivers(setDrivers: (drivers: Driver[]) => void) {
  api.get('motoristas')
    .then(response => {
      setDrivers(response.data)
    })
    .catch(error => {
      alert('Erro')
      console.log('api.get(motoristas) => ', error)
    })
} 

export function getInfractions(setInfractions: (infractions: Infraction[]) => void) {
  api.get('infracoes')
    .then(response => {
      setInfractions(response.data)
    })
    .catch(error => {
      alert('Erro')
      console.log('api.get(infracoes) => ', error)
    })
} 

export function getFines(setFines: (fines: Fine[]) => void) {
  api.get('multas')
    .then(response => {
      setFines(response.data)
    })
    .catch(error => {
      alert('Erro')
      console.log('api.get(multas) => ', error)
    })
}
