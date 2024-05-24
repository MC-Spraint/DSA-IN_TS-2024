export class StacksEasy {
  public calculate(s: string): number {
    let curr = 0;
    let sequenceTotal = 0;
    let sign = 1;
    const stack: number[] = [];

    for (let char of s) {
      if (/\d/.test(char)) curr = curr * 10 + parseInt(char, 10);
      else if (["+", "-"].includes(char)) {
        sequenceTotal += sign * curr;
        curr = 0;
        sign = char === "+" ? 1 : -1;
      } else if (char === ")") {
        sequenceTotal += sign * curr;
        curr = 0;
        sequenceTotal *= stack.pop()!;
        sequenceTotal += stack.pop()!;
      } else if (char === "(") {
        stack.push(sequenceTotal, sign);
        [sequenceTotal, sign] = [0, 1];
        sign = 1;
      }
    }
    sequenceTotal += sign * curr;
    return sequenceTotal;
  }

  public evalRPN(tokens: string[]): number {
    const stack: number[] = [];

    for (const c of tokens) {
      if (c === "/") {
        const a = stack.pop()!;
        const b = stack.pop()!;
        const result = b / a;
        stack.push(Math.trunc(result));
      }
      if (c === "-") {
        const a = stack.pop()!;
        const b = stack.pop()!;
        stack.push(b - a);
      }
      if (c === "+") stack.push(stack.pop()! + stack.pop()!);
      if (c === "*") stack.push(stack.pop()! * stack.pop()!);
      if (!isNaN(parseInt(c, 10))) {
        stack.push(parseInt(c, 10));
      }
    }
    return stack[0];
  }
  public simplifyPath(path: string) {
    let stack: string[] = [];
    let curr: string = "";
    path += "/";

    for (let i = 0; i < path.length; i++) {
      if (path[i] !== "/") {
        if (i < path.length - 1) {
          let c = i;
          while (path[c] !== "/") {
            curr += path[c];
            c++;
          }
          i = c - 1;
        }
        if (curr === "..") stack.pop();
        else if (curr !== "." && curr !== "") stack.push(curr);
        curr = "";
      }
    }
    return "/" + stack.join("/");
  }
  private permuteString(str: string): string[] {
    const result: Set<string> = new Set();

    function permuteHelper(current: string, remaining: string) {
      if (remaining.length === 0) {
        result.add(current);
        return;
      }

      for (let i = 0; i < remaining.length; i++) {
        const nextChar = remaining[i];
        const newCurrent = current + nextChar;
        const newRemaining = remaining.slice(0, i) + remaining.slice(i + 1);
        permuteHelper(newCurrent, newRemaining);
      }
    }

    permuteHelper("", str);
    return Array.from(result);
  }
  private balancedParenthesis(str: string): string[] {
    const p = this.permuteString(str);
    const a: string[] = [];
    for (let i = 0; i < p.length; i++) {
      const element = p[i];
      const isValid = this.isValidParentheses(element);
      if (isValid) {
        a.push(element);
      }
    }
    return a;
  }
  public isValidParentheses(s: string): boolean {
    const stack: string[] = [];
    const bracketPairs: Map<string, string> = new Map([
      [")", "("],
      ["}", "{"],
      ["]", "["],
    ]);

    for (const char of s) {
      if (
        ![...bracketPairs.keys()].includes(char) &&
        ![...bracketPairs.values()].includes(char)
      )
        continue;

      if (
        bracketPairs.has(char) &&
        bracketPairs.get(char) === stack[stack.length - 1]
      )
        stack.pop();
      else stack.push(char);
    }
    return stack.length === 0;
  }
}

// Create an instance of the Solution class
const solutionInstance = new StacksEasy();

// Call the evalRPN method with a list of tokens
const tokens = ["2", "1", "+", "3", "*"];
const result = solutionInstance.evalRPN(tokens);

// Print the result
console.log(result); // Output should be 9
