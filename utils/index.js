const monthMap = {
  '01': 'Jan.',
  '02': 'Feb.',
  '03': 'Mar.',
  '04': 'Apr.',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'Aug.',
  '09': 'Sept.',
  10: 'Oct.',
  11: 'Nov.',
  12: 'Dec.'
}
export const timeFormat = (timeStr) => {
  if (timeStr.length !== 8) {
    return ''
  }
  const year = timeStr.slice(0, 4)
  const month = timeStr.slice(4, 6)
  const date = timeStr.slice(6)
  return monthMap[month] + ' ' + date + ' ' + year
}
