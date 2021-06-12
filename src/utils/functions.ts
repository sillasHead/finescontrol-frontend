import { format } from 'date-fns'

export function today() {
  return format(new Date(), 'yyyy-MM-dd HH:mm').split(' ').join('T')
}