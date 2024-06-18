// Reverse an Integer: Given a 32-bit signed integer, reverse the digits of the integer.
// Palindrome Number: Determine whether an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward.
// Count Primes: Count the number of prime numbers less than a non-negative number, n.
// Fibonacci Number: Compute the nth Fibonacci number.
// Power of Three: Given an integer, determine if it is a power of three.
// Happy Number: Write an algorithm to determine if a number n is "happy."
// Perfect Number: Given an integer, determine if it is a perfect number.
// Armstrong Number: Determine if a number is an Armstrong number.
// Roman to Integer: Convert a Roman numeral to an integer.
// Integer to Roman: Convert an integer to a Roman numeral.

// Reverse an Integer

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





