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

// Roman to Integer

// Count Primes
function countPrimes(n: number): number {
  if (n <= 2) return 0;

  const isPrime = Array(n).fill(true);
  isPrime[0] = false;
  isPrime[1] = false;

  for (let i = 2; i * i < n; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j < n; j += i) {
        isPrime[j] = false;
      }
    }
  }

  return isPrime.filter((prime) => prime).length;
}

// Fibonacci Number
function fibonacci(n: number): number {
  if (n <= 1) return n;

  let prev = 0;
  let current = 1;

  for (let i = 2; i <= n; i++) {
    const temp = current;
    current += prev;
    prev = temp;
  }

  return current;
}

// Power of Three
function isPowerOfThree(n: number): boolean {
  if (n <= 0) return false;

  while (n % 3 === 0) {
    n /= 3;
  }

  return n === 1;
}

// Happy Number
function isHappy(n: number): boolean {
  const seen = new Set<number>();

  while (n !== 1 && !seen.has(n)) {
    seen.add(n);
    n = sumOfSquares(n);
  }

  return n === 1;
}

function sumOfSquares(n: number): number {
  let sum = 0;
  while (n > 0) {
    const digit = n % 10;
    sum += digit * digit;
    n = Math.floor(n / 10);
  }
  return sum;
}

// Perfect Number
function isPerfectNumber(num: number): boolean {
  if (num <= 1) return false;

  let sum = 1; // Start with 1 as all numbers are divisible by 1
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) {
      sum += i;
      if (i * i !== num) {
        sum += num / i;
      }
    }
  }

  return sum === num;
}

// Armstrong Number
function isArmstrongNumber(num: number): boolean {
  const numStr = num.toString();
  const power = numStr.length;
  let sum = 0;

  for (let digit of numStr) {
    sum += Math.pow(parseInt(digit), power);
  }

  return sum === num;
}

function romanToInt(roman: string): number {
  const romanMap: { [key: string]: number } = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let result = 0;
  for (let i = 0; i < roman.length; i++) {
    if (i > 0 && romanMap[roman[i]] > romanMap[roman[i - 1]]) {
      result += romanMap[roman[i]] - 2 * romanMap[roman[i - 1]];
    } else {
      result += romanMap[roman[i]];
    }
  }

  return result;
}

// Integer to Roman
function intToRoman(num: number): string {
  const romanMap: { [key: number]: string } = {
    1: "I",
    4: "IV",
    5: "V",
    9: "IX",
    10: "X",
    40: "XL",
    50: "L",
    90: "XC",
    100: "C",
    400: "CD",
    500: "D",
    900: "CM",
    1000: "M",
  };

  let result = "";
  const values = Object.keys(romanMap).reverse().map(Number);

  for (let value of values) {
    while (num >= value) {
      result += romanMap[value];
      num -= value;
    }
  }

  return result;
}
