export function formatToDate(date: Date): string {
  const dateFormatted = date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  return dateFormatted
}

export function formatToHour(date: Date): string {
  const hourFormatted = date.toLocaleString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return hourFormatted
}
