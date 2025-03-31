+++
title = 'What is the Currying function in js'
date = 2023-11-22T16:55:24+01:00
draft = false
description = "What is currying? Practical examples of currying in JavaScript. Why currying is useful in programming. How to create curried functions."
image = "https://miro.medium.com/v2/resize:fit:1024/0*SYbbtHZcvbFB0fHR.jpg"
imageBig = "https://miro.medium.com/v2/resize:fit:1124/1*HZXeDEUnsEvfXrTGaBEkZw.png"
categories = ["js", "Javascript", "interview"]
authors = ["MK Kumawat"]
avatar = "/images/mk1.png"
+++

Have you noticed how from all of the classic Array methods in JavaScript to iterate and perform some transformations over that data such as map and forEach the one that never really gets understood is reduce?

Well, the same happens with Currying in Functional Programming. Everyone is all in for higher-order functions, or even pure functions with no side effects, but the minute you start talking about currying, their faces go like this:

```javascript
function add(a) {
  return function (b) {
    return a + b;
  };
}

console.log(add(2)(3)); // Output: 5
```

### Why Use Currying?

- **Reusability:** You can create reusable functions with partially applied arguments.

- **Function Composition:** Makes it easier to create higher-order functions.

- **Better Readability:** Breaks complex functions into smaller, more manageable parts.

- **Avoids Repetition:** Helps in situations where some arguments are fixed or known in advance.

- **Functional Programming:** Widely used in functional programming to create smaller, reusable functions.

### **Examples of Currying**

```javascript
function add(a) {
  return function (b) {
    return a + b;
  };
}

const addFive = add(5);
console.log(addFive(10)); // Output: 15
console.log(add(3)(7)); // Output: 10
```

### Example 2: Currying Using Arrow Functions

```javascript
const multiply = (a) => (b) => (c) => a * b * c;

console.log(multiply(2)(3)(4)); // Output: 24
```
### Example 3: Partial Application with Currying
```javascript
const calculateTotal = (tax) => (discount) => (price) => {
  return price + price * tax - discount;
};

const applyTax = calculateTotal(0.18); // 18% tax
const withDiscount = applyTax(50);      // Fixed discount

console.log(withDiscount(200)); // Output: 186
console.log(withDiscount(500)); // Output: 540
```

🚨 __Common Pitfall:__ Over-Currying
>Currying too much can lead to nested function calls, making the code harder to read.
Use it only when it brings clear benefits or simplifies the logic.

Let me know if you need more examples or explanations! 😊🚀