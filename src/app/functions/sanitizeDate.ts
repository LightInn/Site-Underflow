// Regex to sanitize date same for the string regex, but with the ":" , for date format
export function sanitizeDate(str:string) : string{
  str = str.replace(/[^a-z0-9áéíóúñü :\.,_-]/gim,"");
  return str.trim();
}
