function start() {
  startEverything();
}

function startEverything() {
  const animal = new Animal('Totó');
  const dog = new Dog('Jack', 'Poodle');
  const cat = new Cat('Han solo', 'Frajola');

  animal.speak();
  dog.speak();
  cat.speak();
}

class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} speaking...`);
  }
}

class Dog extends Animal {
  constructor(name, type) {
    super(name);

    this.type = type;
  }

  speak() {
    console.log(`${this.name} (${this.type}) barking...`);
  }
}

class Cat extends Animal {
  constructor(name, type) {
    super(name);

    this.type = type;
  }

  speak() {
    console.log(`${this.name} (${this.type}) meowing...`);
  }
}

start();