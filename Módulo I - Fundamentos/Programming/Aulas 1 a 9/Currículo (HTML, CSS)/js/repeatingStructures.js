// Let's practice Repeating Structures

// while: summation with while

var currentNumber = 1;
var summation = 0;

while(currentNumber <= 10) {
  // summation = summation + currentNumber;
  summation += currentNumber;
  currentNumber++;
}

console.log('A soma é ' + summation);


// now with do while

var currentNumber = 10;
var summation = 0;

do {
  summation += currentNumber;
  currentNumber++;
} while(currentNumber <= 10);

console.log('A soma é ' + summation);


// now with for = it's the best!

summation = 0;

for(currentNumber = 11; currentNumber <= 10; currentNumber++) {
  summation += currentNumber;
}

console.log('A soma é ' + summation);