// Here I will add '0' when the date is 0 to 9. Without this function the date get '1/1/2021' for example
function leftPad(value, count = 2, char = '0') { 
  const stringValue = value.toString(); 
  let newValue = stringValue;

  if (stringValue.length < count) {
    for (let i = 0; i < count - stringValue.length; i++) {
      newValue = char + stringValue;
    }
  }
  // Now the date get '01/01/2021'

  return newValue;
}

function getNewTimestamp() {
  const now =  new Date();
  let result = '';

  result += leftPad(now.getDate());
  result += '/';
  result += leftPad(now.getMonth() + 1); // Because JS start his count from 0 to 11
  result += '/';
  result += now.getFullYear();
  result += ' ';
  result += leftPad(now.getHours());
  result += ':';
  result += leftPad(now.getMinutes());
  result += ':';
  result += leftPad(now.getSeconds());
  result += '.';
  result += leftPad(now.getMilliseconds(), 3); // Miliseconds are three numbers, so I send '3' to count

  return result;
}