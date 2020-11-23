function sum(a, b) {
  return a + b;
}

console.log(sum(1, 2));


function compareNumbers(a, b) {
  return a - b;
}

console.log(compareNumbers(1, 2));
console.log(compareNumbers(1, 1));
console.log(compareNumbers(2, 1));


function summation(from, upTo) {
  var sum = 0;

  for(var i = from; i <= upTo; i++){
    sum += i;
  }

  return sum;
}

console.log(summation(0, 1));
console.log(summation(1, 50));
console.log(summation(1, 500));