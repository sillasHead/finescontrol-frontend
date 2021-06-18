import { format } from 'date-fns'

export function today(type: 'date' | 'datetime') {
  if (type === 'date') {
    return format(new Date(), 'yyyy-MM-dd')
  }
  return format(new Date(), 'yyyy-MM-dd HH:mm').split(' ').join('T')
}

export function getElementValue(id: string) {
  return (document.getElementById(id) as HTMLSelectElement).value.toUpperCase().trim()
}
