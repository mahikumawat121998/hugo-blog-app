+++
title = 'What is the Prototype inheritance in JavaScript'
date = 2023-11-22T16:55:24+01:00
draft = false
description = "In Blog Post you will learn everything about Prototype inheritance and it use cases. So stay along with me."
image = "https://miro.medium.com/v2/resize:fit:708/1*WSUwFb0-_86WrF4c4MDb-w.png"
imageBig = "https://process.filestackapi.com/cache=expiry:max/resize=width:1050/4JH9hR06Q2Sm1Ftf7kfa"
categories = ["javascript", "coding", "interview"]
authors = ["MK Kumawat"]
avatar = "/images/mk1.png"
+++

> In JavaScript, Prototype Inheritance allows objects to inherit properties and methods from another object. Every JavaScript object has an internal property called [[Prototype]] that points to another object or null.

When you try to access a property or method on an object, JavaScript first looks for it on the object itself. If not found, it checks the object's prototype, and this process continues up the prototype chain until the property is found or the chain ends.

### Why Do We Use Prototype Inheritance?

- **Memory Efficiency:** Methods can be shared across instances, reducing memory usage.
- **Code Reusability:** Allows objects to inherit features without duplicating code.

- **Dynamic Addition:** Methods and properties can be added to prototypes at runtime.

- **Class-Based OOP Simulation:** JavaScript uses prototype inheritance to mimic class-based inheritance.

### How to Create a Custom Prototype:

#### 1. Using Constructor Functions:

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// Adding methods to the prototype
Person.prototype.greet = function () {
  console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
};

const john = new Person("John", 25);
john.greet(); // Output: Hello, my name is John and I am 25 years old.
```

#### 2. Using Object.create():

```javascript
const animal = {
  speak: function () {
    console.log(`${this.name} makes a sound.`);
  },
};

const dog = Object.create(animal);
dog.name = "Buddy";
dog.speak(); // Output: Buddy makes a sound.
```

#### 3.Setting Up Prototype Inheritance (Subclassing)

```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function () {
  console.log(`${this.name} makes a sound.`);
};

function Dog(name, breed) {
  Animal.call(this, name); // Inherit properties
  this.breed = breed;
}

// Inherit methods
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function () {
  console.log(`${this.name} barks.`);
};

const buddy = new Dog("Buddy", "Golden Retriever");
buddy.speak(); // Output: Buddy makes a sound.
buddy.bark(); // Output: Buddy barks.
```

#### Prototype Inheritance Using Classes (Modern Approach):

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound.`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Calls the parent constructor
    this.breed = breed;
  }

  bark() {
    console.log(`${this.name} barks.`);
  }
}

const buddy = new Dog("Buddy", "Golden Retriever");
buddy.speak(); // Output: Buddy makes a sound.
buddy.bark(); // Output: Buddy barks.
```

### How to Access the Prototype:

You can access the prototype of an object using:

- Object.getPrototypeOf(object)

- object.**proto** (not recommended, as it’s deprecated)

- Constructor.prototype for constructor functions

### Creating you own prototype

```javascript
console.log(Object.getPrototypeOf(buddy)); // Outputs the Dog prototype
console.log(buddy.__proto__); // Same as above (deprecated)
console.log(Dog.prototype); // The prototype object of Dog
```

```javascript
const car = {
  wheels: 4,
  start: function () {
    console.log("Car is starting...");
  },
};

const myCar = Object.create(car);
myCar.brand = "Toyota";

console.log(myCar.wheels); // Output: 4 (inherited)
myCar.start(); // Output: Car is starting...
console.log(Object.getPrototypeOf(myCar)); // Shows car object
```
### Prototype Chain:
When accessing a property or method, JavaScript checks the object itself first. If not found, it checks the object's prototype, and so on, until it reaches null.

```javascript
console.log(buddy.hasOwnProperty("name"));  // true (own property)
console.log(buddy.hasOwnProperty("speak")); // false (inherited)
console.log("speak" in buddy);              // true (found in prototype)
```