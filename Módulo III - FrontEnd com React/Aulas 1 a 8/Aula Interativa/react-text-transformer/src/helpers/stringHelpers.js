const WITH_SPECIAL_CHARACTERS = 'áãâäàÁÃÂÄÀéêëèÉÊËÈíîïìÍÎÏÌóõôöòÓÕÔÖÒúûüùÚÛÜÙñÑçÇ'.split('');

const WITHOUT_SPECIAL_CHARACTERS = 'aaaaaAAAAAeeeeEEEEiiiiIIIIoooooOOOOOuuuuUUUUnNcC'.split('');

const VOWELS = 'aáãâäàeéêëèiíîïìoóõôöòuúûüù'.split('');

export function isVowel(char) {
  return VOWELS.includes(char.toLowerCase());
}

export function isNumber(char) {
  return !isNaN(char);
}

export function isConsoant(char) {
  return !isVowel(char) && !isNumber(char);
}

export function removeSpecialCharacteres(text) {
  return text.split('').map(char => {
    const index = WITH_SPECIAL_CHARACTERS.indexOf(char);
    return index < 0 ? char : WITHOUT_SPECIAL_CHARACTERS[index];
  }).join('');
}

// reverse hands on ahhahaha
export function reverse(text) {
  const array1 = text.split('');
  let array2 = [];

  while (array1.length) {
    array2.push(array1.pop());
  }

  return array2.join('');
}
