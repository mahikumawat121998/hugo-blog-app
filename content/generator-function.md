+++
title = 'What is a Generator Function in JavaScript?'
date = 2023-12-22T16:55:24+01:00
draft = false
description = "A generator function is a special kind of function that can be paused and resumed, allowing it to yield multiple values over time. Unlike regular functions that execute from start to finish, generator functions return an iterator object that can be used to manually control the function's execution."
image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFcBzsdxeuZYv-UYo9D2i8lgE2Rr-26QS8aQ&s"
imageBig = "https://media.licdn.com/dms/image/v2/D5612AQEizkAXYNBx1g/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1720551898753?e=2147483647&v=beta&t=GmnEEBcW1SMV0Rils9vSgImwJ7T_5yyjXosjzIp7xew"
categories = ["js", "generator", "interview"]
authors = ["MK Kumawat"]
avatar = "/images/mk1.png"
+++

A generator function is a special kind of function that can be paused and resumed, allowing it to yield multiple values over time. Unlike regular functions that execute from start to finish, generator functions return an iterator object that can be used to manually control the function's execution.

### Syntax:
* Defined using the function* syntax (the asterisk * after function).

* Uses the yield keyword to pause the function and return a value.

* Resumed with the next() method.

function* generatorFunction() {
  yield "Hello";
  yield "World";
}
```javascript
const gen = generatorFunction();
console.log(gen.next()); // { value: "Hello", done: false }
console.log(gen.next()); // { value: "World", done: false }
console.log(gen.next()); // { value: undefined, done: true }

```

### Why Use Generator Functions?

* __Lazy Evaluation:__ Generates values on demand rather than computing them all at once.

* __Memory Efficiency:__ Doesn't store all values at once, reducing memory usage.

* __Control over Execution:__ Can pause and resume function execution, which is not possible with regular functions.

* __Asynchronous Programming:__ Can simplify async operations when combined with yield and Promises.

* __Infinite Sequences:__ Generate an infinite sequence of values without crashing the system.

 ### How Does a Generator Work?

A generator function returns an iterator. You use the next() method to:

1. Move to the next yield.

2. Get the value returned by the current yield.

3. Know if the generator has completed (done: true).


``` javascript
function* count() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

const counter = count();
console.log(counter.next().value); // 0
console.log(counter.next().value); // 1
console.log(counter.next().value); // 2

```
```javascript
function* iterateArray(arr) {
  for (const item of arr) {
    yield item;
  }
}

const iterator = iterateArray(["Apple", "Banana", "Cherry"]);
console.log(iterator.next().value); // Apple
console.log(iterator.next().value); // Banana
console.log(iterator.next().value); // Cherry
```
```javascript
function* asyncTask() {
  const user = yield fetch("https://jsonplaceholder.typicode.com/users/1").then(res => res.json());
  console.log("User:", user);
}

const iterator = asyncTask();
const promise = iterator.next().value;

promise.then((user) => iterator.next(user));
```

### When to Use Generators:

* __Lazy Iteration:__ Generating values on demand.

* __Infinite Sequences:__ Creating endless data streams efficiently.

* __Async Flow Control:__ Simplifying asynchronous code.

* __Data Streaming:__ Handling large data sets without loading them entirely.

* __Custom Iterators:__ Creating iterable objects.

Generators offer a powerful way to handle scenarios where you need to manage multiple values over time, rather than all at once