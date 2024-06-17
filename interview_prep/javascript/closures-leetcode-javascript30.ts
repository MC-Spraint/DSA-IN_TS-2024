type ToBeOrNotToBe = {
  toBe: (val: any) => boolean;
  notToBe: (val: any) => boolean;
};

function expect(val: any): ToBeOrNotToBe {
  const v = val;
  function toBe(equalsTo: any) {
    if (v === equalsTo) {
      console.log("True");
      return true;
    } else throw "Not Equal";
  }
  function notToBe(notEqualsTo: any) {
    if (v !== notEqualsTo) {
      console.log("True");
      return true;
    } else throw "Equal";
  }
  return {
    toBe,
    notToBe,
  };
}
expect(5).toBe(5);
expect(5).notToBe(5);

//counter1
function createCounter(n: number): () => number {
  let counter = n;

  return function (): number {
    let c = counter++;
    console.log(c);
    return c;
  };
}

const counter = createCounter(10);
counter(); // 10
counter(); // 11
counter(); // 12

//counter2
type Counter = {
  increment: () => number;
  decrement: () => number;
  reset: () => number;
};

function createCounter2(init: number): Counter {
  let counter = init;

  function increment(): number {
    counter = ++ counter;
    let c = counter;
    console.log(c);
    return c;
  }
  function decrement(): number {
    counter = -- counter;
    let c = counter;
    console.log(c);
    return c;
  }
  function reset(): number {
    counter = init;
    let c = counter;
    console.log(c);
    return c;
  }
  return { increment, decrement, reset };
}
