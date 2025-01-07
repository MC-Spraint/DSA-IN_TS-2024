async function asyncExample() {
    const promise1 = new Promise((resolve,reject) => resolve('Promise 1 resolved'));
    const promise2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Promise 2 resolved');
      }, 2000);
    });
    const promise3 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Promise 3 resolved');
      }, 2000);
    });
    const promise4 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Promise 4 resolved');
      }, 2000);
    });
  
    try {
      const allResults = await Promise.all([promise1, promise2, promise3, promise4]);
      console.log('Promise.all Result:', allResults);
    } catch (error) {
      console.error('Promise.all Error:', error);
    }
  
  const allSettledResults = await Promise.allSettled([promise1, promise2, promise3, promise4]);
  console.log('Promise.allSettled Result:', allSettledResults);
  console.log(promise1)
  }
  asyncExample();
  
  // Async function that returns a pending promise
  async function asyncFunction() {
    return new Promise((resolve, reject) => {
      // Simulate some asynchronous operation, such as fetching data
      setTimeout(() => {
        resolve('Resolved');
      }, 2000); // Random delay
    });
  }
  
  async function resolveAllPromises() {
  const promises = [asyncFunction(), asyncFunction(), asyncFunction()]
    try {
      const results = await Promise.all(promises);
      console.log('res', results);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  resolveAllPromises();
  //will run in parallel
  //async await is added to resolve pending promises
  
  async function resolveAllPromises2() {
  const promises2 = [await asyncFunction(), await asyncFunction(), await asyncFunction()]
    try {
      const results = await Promise.all(promises2)
        
      console.log('res', results);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  resolveAllPromises2() 
  //will run sequensially
  
  async function resolveAllPromises3() {
  const promises2 = [asyncFunction(), asyncFunction(), asyncFunction()]
    try {
      const results = await Promise.all(promises2.map(async p => await p))
        
      console.log('res', results);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  resolveAllPromises3() 
  //will run in parallel
  //async await is used because promises2 contains awit keyword
  
  //Tips
  //we cant excecute a sequence of functions in parallel if they have await keyword before each
  //we can excecute a sequence of functions in parallel if they dont have await keyword before each
  //we cant use await keyword globally
  //use promise constructor while dealing with single promises
  //while using promise constructor with single promises always use resolve() to resolve the promise
  //In global scope alsways use .then .catch with Promise.all, Promise.allSettled and promise constructors;
  
  
  // Call all promises , asyncFunction(), asyncFunction()in parallel
  const b = Promise.all([asyncFunction])
      .then(results => {
      console.log("All promises resolved:", results);
    })
    .catch(error => {
      console.error("Error:", error);
    });;
  console.log(b)
  
  
  // Call the async function
  
  
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
    return greeting + ', ' + name + '!';
  }
  
  // Partially applying the greet function with the first argument fixed
  const sayHello = greet2.bind(null, "hello");
  const underTheHoodSayHello = function(name) {
    return greet2.call(null, "hello", name);
  };
  
  
  // Now sayHello is a function with the 'greeting' argument fixed
  console.log(sayHello('Alice')); // Output: Hello, Alice!
  console.log(sayHello('Bob'));   // Output: Hello, Bob!
  console.log(underTheHoodSayHello('Bob'));
  
  //[4] Currying
  // Normal add function
  function normalAdd(x, y) {
    return x + y;
  }
  
  // Curried version of add function
  function curriedAdd(x) {
    return function(y) {
      return x + y;
    };
  }
  
  // Usage
  const addTwo = curriedAdd(2);
  console.log(addTwo(3)); // Output: 5
  console.log(curriedAdd(2)(3)); // Output: 5
  
  //[3] Pipe line composition with 'pipe'
  const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);
  
  const addition = x => y => x + y;
  const square = x => x * x;
  const subtraction = x => y => x - y;
  
  const calculator = pipe(
    addition(5),
    square,
    subtraction(10)
  );
  
  console.log(calculator(7)); // Output: 54 (subtract(square(addition(7, 5)), 10))
  
  
  
  //[2]Function composition with "compose"
  const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);
  const add = x => y => y + x;
  const multiply = x => y => y * x;
  const subtract = x => y => y - x;
  
  const calculate = compose(
    subtract(10),
    multiply(2),
  );
    

