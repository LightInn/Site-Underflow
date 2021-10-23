// local format from date object js
export function toFormDateLocaleString(date:Date):string{
  const offset = date.getTimezoneOffset()
  date = new Date(date.getTime() - (offset*60*1000))
  // @ts-ignore
  return (date.toISOString().match(/^.*T[0-9]+:[0-9]+/))[0]
}
