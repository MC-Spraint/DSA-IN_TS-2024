const isMatchingBracket = (open: string, close: string): boolean => {
  return (
    (open === "(" && close === ")") ||
    (open === "{" && close === "}") ||
    (open === "[" && close === "]")
  );
};
function isValidParentheses(s: string): boolean {
  let balance = 0;
  const arr: string[] = [];
  for (const char of s) {
    const isOpen = char === "(" || char === "{" || char === "[";
    const isClose = char === ")" || char === "}" || char === "]";
    const isNoMatch =
      arr.length === 0 || !isMatchingBracket(arr[arr.length - 1]!, char);

    if (isOpen) {
      arr[arr.length] = char;
      balance++;
    } else if (isClose) {
      if (isNoMatch) {
        return false;
      }
      balance--;
    }
  }

  return balance === 0;
}
console.log(isValidParentheses("()"));
