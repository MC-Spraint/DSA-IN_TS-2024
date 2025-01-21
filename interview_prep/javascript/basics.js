console.log("Main Thread: Start");
process.nextTick(() => console.log('process.nextTick'));
setImmediate(() => console.log('setImmediate'));
Promise.resolve().then(() => console.log('Promise'));
setTimeout(() => console.log('setTimeout'), 0);
console.log("Main Thread: End");
setInterval(() => console.log("setInterval"), 1000);
// Output
// [1] Main Thread: Start
// [2] Main Thread: End
// [3] process.nextTick
// [4] setImmediate
// [5] Promise
// [6] setTimeout
// [7] setInterval

console.log("false | false: ", false | false);
console.log("true | false: ", true | false);
console.log("true | true: ", true & true);
console.log("false & false: ", false & false);
console.log("false & true: ", false & true);
console.log("true & true: ", true & true);
console.log("false - '2': ", false - '2');
console.log("2 - false: ", 2 - false);
console.log("true > 0: ", true > 0);
console.log("false < true: ", false < true);
console.log("false > true: ", false > true);
console.log("0 == false: ", 0 == false);
console.log("'0' == false: ", '0' == false);
console.log("'0' == true: ", '0' == true);
console.log("'2' + 2 - true - true: ",'2' + 2 - true - true);
console.log("'0' + 0: ", '0' + 0);
console.log("0 + '0': ", 0 + '0');
// Output
// false | false:  0
// true | false:  1
// true | true:  1
// false & false:  0
// false & true:  0
// true & true:  1
// false - '2':  -2
// 2 - false:  2
// true > 0:  true
// false < true:  true
// false > true:  false
// 0 == false:  true
// '0' == false:  true
// '0' == true:  false
// '2' + 2 - true - true:  20
// '0' + 0:  00
// 0 + '0':  00

// Async function that returns a pending promise
async function asyncFunction() {
  return new Promise((resolve, reject) => {
    // Simulate some asynchronous operation, such as fetching data
    setTimeout(() => {
      resolve("Resolved");
    }, 2500); // Random delay
  });
}

async function resolveAllPromises() {
  const promises = [asyncFunction(), asyncFunction(), asyncFunction()];
  try {
    const results = await Promise.all(promises);
    console.log("res", results);
  } catch (error) {
    console.error("Error:", error);
  }
}
async function resolveAllPromises2() {
  const promises2 = [
    await asyncFunction(),
    await asyncFunction(),
    await asyncFunction(),
  ];
  try {
    const results = await Promise.all(promises2);

    console.log("res", results);
  } catch (error) {
    console.error("Error:", error);
  }
}
async function resolveAllPromises3() {
  const promises2 = [asyncFunction(), asyncFunction(), asyncFunction()];
  try {
    const results = await Promise.all(promises2.map(async (p) => await p));

    console.log("res", results);
  } catch (error) {
    console.error("Error:", error);
  }
}

resolveAllPromises();
//will run in parallel
//async await is added to resolve pending promises
resolveAllPromises2();
//will run sequensially
resolveAllPromises3();
//will run in parallel
//async await is used because promises2 contains awit keyword
const p = Promise.all([asyncFunction])
  .then((results) => {
    console.log("All promises resolved:", results);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
console.log(p);


async function asyncExample() {
  const promise1 = new Promise((resolve, reject) =>
    resolve("Promise 1 resolved")
  );
  const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Promise 2 resolved");
    }, 2000);
  });
  const promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Promise 3 resolved");
    }, 2000);
  });
  const promise4 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Promise 4 resolved");
    }, 2000);
  });

  try {
    const allResults = await Promise.all([
      promise1,
      promise2,
      promise3,
      promise4,
    ]);
    console.log("Promise.all Result:", allResults);
  } catch (error) {
    console.error("Promise.all Error:", error);
  }
  const allSettledResults = await Promise.allSettled([
    promise1,
    promise2,
    promise3,
    promise4,
  ]);
    
  console.log("Promise.allSettled Result:", allSettledResults);
  console.log(promise1);
}
asyncExample();








var obj = {
  property1: "att1",
  property2: {
    property1: "innerProperty",
    aFunction() {
      // Reference obj.property1
      let outerProperty = obj.property1;

      // Create a string that combines inner and outer properties
      let combinedProperty = `${outerProperty} - ${this.property1}`;
      return combinedProperty;
    },
  },
};
const fcall1 = obj.property2.aFunction();
const fcall2 = obj.property2.aFunction.bind(obj.property2);

console.log(fcall2()); // Outputs: "att1 - innerProperty"

//Explicit binding
function greet1() {
  return "Hello, " + this.name + "!";
}

const person = { name: "Alice" };
const greetWithCall = greet1.call(person);
const greetWithApply = greet1.apply(person);
const greetWithBind = greet1.bind(person);
console.log(greetWithCall()); // Output: Hello, Alice!
console.log(greetWithApply()); // Output: Hello, Alice!
console.log(greetWithBind()); // Output: Hello, Alice!
/*
  call: The call method allows you to call a function 
  with a specified this value and arguments 
  provided individually.
  
  apply: Similar to call, the apply method allows you to call a function
  with a specified this value and an array of arguments.
  
  bind: The bind method creates a new function 
  with a specified this value, without calling the original function immediately. 
  It's particularly useful for creating a new function 
  with a fixed this value, which can be called later.
  */

//[5] Partial Application of bind keyword
function greet2(greeting, name) {
  return greeting + ", " + name + "!";
}

// Partially applying the greet function with the first argument fixed
const sayHello = greet2.bind(null, "hello");
const underTheHoodSayHello = function (name) {
  return greet2.call(null, "hello", name);
};

// Now sayHello is a function with the 'greeting' argument fixed
console.log(sayHello("Alice")); // Output: Hello, Alice!
console.log(sayHello("Bob")); // Output: Hello, Bob!
console.log(underTheHoodSayHello("Bob"));

//[4] Currying
// Normal add function
function normalAdd(x, y) {
  return x + y;
}

// Curried version of add function
function curriedAdd(x) {
  return function (y) {
    return x + y;
  };
}

// Usage
const addTwo = curriedAdd(2);
console.log(addTwo(3)); // Output: 5
console.log(curriedAdd(2)(3)); // Output: 5

//[3] Pipe line composition with 'pipe'
const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((acc, fn) => fn(acc), x);

const addition = (x) => (y) => x + y;
const square = (x) => x * x;
const subtraction = (x) => (y) => x - y;

const calculator = pipe(addition(5), square, subtraction(10));

console.log(calculator(7)); // Output: 54 (subtract(square(addition(7, 5)), 10))

//[2]Function composition with "compose"
const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((acc, fn) => fn(acc), x);
const add = (x) => (y) => y + x;
const multiply = (x) => (y) => y * x;
const subtract = (x) => (y) => y - x;

const calculate = compose(subtract(10), multiply(2));
