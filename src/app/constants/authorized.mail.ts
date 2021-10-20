let arrayMail = [
  "epsi.fr",
  "ecoles-wis.net"
]

/**
 * We transform the array of mail just on top of this to regex Value
 */
let regexMail = '@((';
regexMail += arrayMail.join(')|(');
regexMail += '))$'

export const regexMailCreated = new RegExp(regexMail);
