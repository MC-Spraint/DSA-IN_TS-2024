function logExecution(fn) {
    return function(...args) {
      console.log(`Executing function with arguments: ${args}`);
      const result = fn(...args);
      console.log(`Function returned: ${result}`);
      return result;
    };
  }
  
  function add(a, b) {
    return a + b;
  }
  
  const loggedAdd = logExecution(add);
  console.log(loggedAdd(2, 3)); // Logs details and returns 5

  function memoize(fn) {
    const cache = new Map();
    return function(...args) {
      const key = JSON.stringify(args);
      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = fn(...args);
      cache.set(key, result);
      return result;
    };
  }
  
  function slowFunction(num) {
    // Simulate a slow computation
    return num * 2;
  }
  
  const fastFunction = memoize(slowFunction);
  console.log(fastFunction(5)); // Computed and cached
  console.log(fastFunction(5)); // Retrieved from cache
  

  function map(arr, fn) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      result.push(fn(arr[i]));
    }
    return result;
  }
  
  const numbers = [1, 2, 3, 4];
  const doubled = map(numbers, x => x * 2);
  console.log(doubled); // [2, 4, 6, 8]

  
  const compose = (f, g) => x => f(g(x));

const add1 = x => x + 1;
const multiply2 = x => x * 2;

const add1ThenMultiply2 = compose(multiply2, add1);
console.log(add1ThenMultiply2(3)); // 8


function multiply(a, b) {
    return a * b;
  }
  
  function partialMultiply(a) {
    return function(b) {
      return multiply(a, b);
    };
  }
  
  const double = partialMultiply(2);
  console.log(double(5)); // 10
  
  function add(a, b) {
    return a + b;
  }
  
  function curryAdd(a) {
    return function(b) {
      return add(a, b);
    };
  }
  
  const add5 = curryAdd(5);
  console.log(add5(3)); // 8
  