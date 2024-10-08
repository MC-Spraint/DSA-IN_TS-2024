function reverseNumber(x: number): number {
  let reversed = 0;
  while (x !== 0) {
    const digit = x % 10;
    reversed = reversed * 10 + digit;
    x = Math.trunc(x / 10);
  }
  return reversed;
}
// A series where 1 is devided by each natural numbers starting from 1
function harmonicSeriesSum(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += 1 / i;
  }
  return sum;
}

function isArmstrongNumber(num: number): boolean {
  const numStr = num.toString();
  const power = numStr.length;
  let sum = 0;

  for (let digit of numStr) {
    sum += Math.pow(parseInt(digit), power);
  }

  return sum === num;
}
function isPowerOfThree(n: number): boolean {
  if (n <= 0) return false;

  while (n % 3 === 0) n /= 3;
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
function isHappy(n: number): boolean {
  const seen = new Set<number>();

  while (true) {
    if (n === 1) return true;
    if (seen.has(n)) return false;
    seen.add(n);

    n = sumOfSquares(n);
  }
}
function areAmicableNumbers(a: number, b: number): boolean {
  if (a === b) return false;
  const divisorsSum = (num: number) =>
    getAllDivisors(num).reduce((acc, elem) => (elem += acc));
  return divisorsSum(a) === b && divisorsSum(b) === a;
}
function getAllDivisors(num: number): number[] {
  const divisors: number[] = [];
  for (let i = 1; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      //If no remainder
      divisors.push(i); // Add the divisor
      const pairedDivisor = num / i;
      if (i !== 1 && i !== pairedDivisor) {
        divisors.push(pairedDivisor); // Add the paired divisor
      }
    }
  }
  return divisors.sort((a, b) => a - b); // Sort the divisors in ascending order
}
function isPerfectNumber(num: number): boolean {
  if (num <= 1) return false;

  let sum = 0;
  for (let i = 1; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      sum += i;
      if (i !== 1 && i !== num / i) {
        sum += num / i;
      }
    }
  }

  return sum === num;
}
function printPrimes(n: number): number[] {
  let arr: number[] = [];
  let num = 2;
  while (arr.length < n) {
    let isPrimes = true;

    for (let i = 2; i <= Math.sqrt(num); i++) {
      // 1 isn't a prime
      if (num % i === 0) {
        isPrimes = false;
        break;
      }
    }

    if (isPrimes) arr.push(num);
    num++;
  }
  return arr;
}
function primeFactors(num: number): number[] {
  const factors: number[] = [];

  for (let i = 2; i <= Math.sqrt(num); i++) {
    // 1 isn't a prime
    while (num % i === 0) {
      factors.push(i);
      num /= i;
    }
  }
  // If initial num exceeds 1, it's prime too
  if (num > 1) factors.push(num);
  return factors;
}

function sqrt(n: number): number {
  let low = 0;
  let high = n;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const square = mid * mid;
    if (square === n) {
      return mid;
    } else if (square < n) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return high; // Return the integer part of the square root
}

function applyConstraints(num: number): number {
  const INT_MIN = Math.pow(-2, 31);
  const INT_MAX = Math.pow(2, 31) - 1;

  if (num < INT_MIN || num > INT_MAX) return 0;

  return num;
}
function binaryToDecimal(binaryStr: string): number {
  return parseInt(binaryStr, 2);
}
function decimalToBinary(decimalNum: number): string {
  return decimalNum.toString(2);
}
function sumOfNaturalNumbers(n: number): number {
  return (n * (n + 1)) / 2;
}
function arithmeticSequenceSum(
  firstTerm: number,
  n: number,
  commonDifference: number
): number {
  return (n * (2 * firstTerm + (n - 1) * commonDifference)) / 2;
}
function sumOfSquaress(n: number): number {
  return (n * (n + 1) * (2 * n + 1)) / 6;
}
function gcd(a: number, b: number): number {
  if (b === 0) return a;
  return gcd(b, a % b);
}
function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}


function trailingZeroesInFactorial(n: number): number {
  let count = 0;
  while (n >= 5) {
    n = Math.floor(n / 5);
    count += n;
  }
  return count;
}

function catalanNumber(n: number): number {
  if (n <= 1) return 1;
  let result = 0;
  for (let i = 0; i < n; i++) {
    result += catalanNumber(i) * catalanNumber(n - 1 - i);
  }
  return result;
}

function grayCode(n: number): number[] {
  const result: number[] = [0];
  for (let i = 0; i < n; i++) {
    const size = result.length;
    for (let j = size - 1; j >= 0; j--) {
      result.push(result[j] | (1 << i));
    }
  }
  return result;
}

function generatePascalsTriangle(n: number): number[][] {
  const triangle: number[][] = [];
  for (let i = 0; i < n; i++) {
    triangle[i] = [];
    triangle[i][0] = 1;
    for (let j = 1; j < i; j++) {
      triangle[i][j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
    }
    triangle[i][i] = 1;
  }
  return triangle;
}
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
