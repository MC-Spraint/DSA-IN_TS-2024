## NodeJs Coding Concept Questions(6)

### [1] IIFE(Immediately Invoked Function Expression):

An Immediately Invoked Function Expression (IIFE) is a JavaScript function that is defined and executed immediately after its creation. It is a way to encapsulate code within a function to avoid polluting the global scope.

### [2] Promise Chaining:

Promise chaining is a technique in JavaScript that involves chaining multiple promises together to **handle a sequence of asynchronous operations** in a more readable and organized manner. It is a way to express a series of asynchronous tasks one after the other, making the code easier to understand and maintain.

### [3] Closure:

 A closure is formed when a function is defined within another function, allowing the inner function to access the outer function's variables and parameters, even after the outer function has finished executing.
 it is a fundamental concept in programming, particularly in languages that support first-class functions or function values.

### [4] Currying:

The term "currying" refers to a process in functional programming where a function is transformed into a sequence of functions, each taking a single argument. In other words, a curried function is a function that returns another function with one or more arguments "pre-filled."
Instead of taking all arguments at once, a curried function takes one argument at a time and returns a new function that takes the next argument, and so on, until all arguments are consumed and the final result is produced.

### [5] Hoisting:

Hoisting is a JavaScript behavior in which variable and function declarations are moved to the top of their containing scope during the compilation phase, before code execution begins. This means that variables and functions can be referenced before they are declared in the code. It's important to note that only declarations are hoisted, not initializations.


### [6] Higher-order Functions

Higher-order functions are functions that take other functions as arguments or return functions as results. They enable functional programming paradigms such as function composition, currying, and callback-based asynchronous programming.

### [7] What are the differences between let, var, and const?

1. var: var is function-scoped and can be re-declared and updated throughout the function.
2. let: let is block-scoped, can be updated but not re-declared in the same scope.
3. const: const is block-scoped, cannot be updated or re-declared once initialized.

### [8] Event Delegation
Event delegation is a technique in which a single event listener is attached to a parent element to handle events for multiple child elements. It improves performance and reduces memory consumption by avoiding the need to attach event listeners to each individual element.


### [9] Explain call, apply, and bind!
call: The call method allows you to call a function 
with a specified this value and arguments provided individually.

apply: Similar to call, the apply method allows you to call a function
with a specified this value and an array of arguments.

bind: The bind method creates a new function 
with a specified this value, without calling the original function immediately.

Bind is particularly useful for creating a new function 
with a fixed this value, which can be called later.
#### Example:
````Typescript
function greet() {
  return "Hello, " + this.name + "!";
}

const person = { name: "Alice" };
const greetWithCall = greet.call(person);
const greetWithApply = greet.apply(person);
const greetWithBind = greet.bind(person);
console.log(greetWithCall()); // Output: Hello, Alice!
console.log(greetWithApply()); // Output: Hello, Alice!
console.log(greetWithBind()); // Output: Hello, Alice!
````
### [10] Generators:

Answer: Generators are functions that can be exited and later re-entered, with their context (variable bindings) saved across re-entrances. Generators are particularly useful for managing asynchronous programming in a more synchronous fashion, especially before async/await was introduced.

#### Example: 
````javascript
function* idGenerator() 
{
     let id = 1; 
     while (true)  yield id++; 
} 
const gen = idGenerator(); 
// "Generator { }" console.log(gen.next().value); 
// 1 console.log(gen.next().value); 
// 2 console.log(gen.next().value);

````



