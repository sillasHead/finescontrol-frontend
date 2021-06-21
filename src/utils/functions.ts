import { format } from 'date-fns'

export function today(type: 'date' | 'datetime') {
  if (type === 'date') {
    return format(new Date(), 'yyyy-MM-dd')
  }
  return format(new Date(), 'yyyy-MM-dd HH:mm').split(' ').join('T')
}

export function getElementValue(id: string, textTransform?: 'uppercase') {
  const value = (document.getElementById(id) as HTMLSelectElement).value.trim()
  if (textTransform) {
    return value.toUpperCase()
  }
  return value
}

export function getElementValueParsedNumber(id: string) {
  return Number.parseInt((document.getElementById(id) as HTMLSelectElement).value)
}
