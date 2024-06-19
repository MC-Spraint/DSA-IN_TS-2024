// Reverse an Integer: Given a 32-bit signed integer, reverse the digits of the integer.
function reverseInteger(x: number, hasConstrainst = false): number {
  let reversed = 0;
  while (x !== 0) {
    const digit = x % 10;
    reversed = reversed * 10 + digit;
    x = Math.trunc(x / 10);
  }
  const constraints =
    reversed < Math.pow(-2, 31) || reversed > Math.pow(2, 31) - 1;
  if (hasConstrainst) {
    if (constraints) return 0;
    return reversed;
  }
  return reversed;
}

// Palindrome Number
function isPalindrome(x: number): boolean {
  if (x < 0) return false;
  const reversed = reverseInteger(x);
  return x === reversed;
}

// Fibonacci Number





