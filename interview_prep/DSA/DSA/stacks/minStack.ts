export class MinStack {
  stack: number[];
  minStack: number[];

  constructor() {
    this.stack = [];
    this.minStack = [];
  }

  push(x: number): void {
    this.stack.push(x);
    if (
      this.minStack.length === 0 ||
      x <= this.minStack[this.minStack.length - 1]
    ) {
      this.minStack.push(x);
    }
  }

  pop(): void {
    if (this.stack.length > 0) {
      const top = this.stack.pop()!;
      if (top === this.minStack[this.minStack.length - 1]) {
        this.minStack.pop();
      }
    }
  }

  top(): number | undefined {
    return this.stack[this.stack.length - 1];
  }

  getMin(): number | undefined {
    return this.minStack[this.minStack.length - 1];
  }
}

// Example usage:
const stack = new MinStack();
stack.push(-2);
stack.push(0);
stack.push(-3);
console.log("Minimum element:", stack.getMin()); // Output: -3
stack.pop();
console.log("Top element:", stack.top()); // Output: 0
console.log("Minimum element:", stack.getMin()); // Output: -2
