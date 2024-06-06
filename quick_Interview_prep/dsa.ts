class Strings {
  /**[array method 1] */
  public reverse(s: string): string {
    if (!s) return "";
    return this.reverse(s.slice(1)) + s[0];
  }
  /**[1] */
  public isPalindrome(s: string): boolean {
    return s.split("").reverse().join("") === s;
  }
  public isPalindromeRecursive(str: string): boolean {
    if (str.length <= 1) return true;
    else if (str[0] !== str[str.length - 1]) return false;
    else return this.isPalindromeRecursive(str.slice(1, str.length - 1));
  }
  public isPalindromeTwoPointers(s: string): boolean {
    for (let left = 0, right = s.length - 1; left < right; left++, right--) {
      if (s[left] !== s[right]) return false;
    }
    return true;
  }
  /**[2] */
  public isAnagrams(s: string, t: string): boolean {
    s = t.split("").sort().join("");
    t = t.split("").sort().join("");
    return s === t;
  }
  /**[3] */
  public countWords(str: string): number {
    str = str.trim();
    if (str === "") {
      return 0;
    } else {
      let spaceIndex = str.indexOf(" ");
      if (spaceIndex === -1) return 1; // Only one word is left
      else return 1 + this.countWords(str.slice(spaceIndex + 1));
    }
  }

  /**[4] */
  public reverseWordsWithoutExtraSpace(s: string) {
    const newString = s
      .split(" ")
      .reverse()
      .filter((word) => word !== "")
      .join(" ");
    return newString;
  }

  /**[5] */
  public longestCommonPrefix(strs: string[]) {
    let ns: string = "";
    let i = 0,
      maxLen = 0;
    for (let e of strs) maxLen = Math.max(i, e.length);
    while (i !== maxLen) {
      let na: string[] = [];
      for (let j = 0; j < strs.length; j++)
        if (strs[0][i] === strs[j][i]) na.push(strs[j][i]);
      if (na.length !== strs.length) return ns;
      const [common] = na;
      if (common) ns += common;
      i++;
    }
    return ns;
  }
  /**[6] */

  public fullJustify(words: string[], maxWidth: number): string[] {
    const res: string[] = [];
    let line: string[] = [];
    let len = 0;

    words.forEach((word) => {
      if (len + word.length + line.length > maxWidth) {
        res.push(this.justifyLine(line, len, maxWidth));
        line = [];
        len = 0;
      }
      line.push(word);
      len += word.length;
    });
    res.push(this.leftJustifyLine(line, maxWidth));
    return res;
  }
  private justifyLine(line: string[], len: number, maxWidth: number): string {
    const spaces = maxWidth - len;
    const gaps = line.length - 1;
    if (gaps === 0) return line[0] + " ".repeat(spaces);

    const spacesPerGap = Math.floor(spaces / gaps);
    let extraSpaces = spaces % gaps;
    return line.reduce((str, word, i) => {
      if (i === line.length - 1) return str + word;
      const gap = spacesPerGap + (extraSpaces-- > 0 ? 1 : 0);
      return str + word + " ".repeat(gap);
    }, "");
  }

  public leftJustifyLine(line: string[], maxWidth: number): string {
    const lastLine = line.join(" ");
    return lastLine + " ".repeat(maxWidth - lastLine.length);
  }
  /**[7] */
  static romanToInt(s: string): number {
    const map = new Map<string, number>([
      ["I", 1],
      ["V", 5],
      ["X", 10],
      ["L", 50],
      ["C", 100],
      ["D", 500],
      ["M", 1000],
    ]);

    let n = map.get(s[0])!;
    for (let i = 1; i < s.length; i++) {
      const [curr, prev] = [map.get(s[i])!, map.get(s[i - 1])!];

      if (curr <= prev) n += curr;
      else n += curr - 2 * prev;
    }
    return n;
  }
  static romanToInt1(s: string): number {
    const arr: [string, number][] = [
      ["I", 1],
      ["V", 5],
      ["X", 10],
      ["L", 50],
      ["C", 100],
      ["D", 500],
      ["M", 1000],
    ];

    let n = this.getVal(s[0], arr)!;
    for (let i = 1; i < s.length; i++) {
      const [curr, prev] = [
        this.getVal(s[i], arr)!,
        this.getVal(s[i - 1], arr)!,
      ];
      if (curr <= prev) n += curr;
      else n += curr - 2 * prev;
    }
    return n;
  }
  static getVal(char: string, arr: [string, number][]): number {
    for (let a of arr) if (a[0] === char) return a[1];
    return 0;
  }

  /**[8] */
  static intToRoman(num: number) {
    const romanNumerals = new Map([
      [1, "I"],
      [4, "IV"],
      [5, "V"],
      [9, "IX"],
      [10, "X"],
      [40, "XL"],
      [50, "L"],
      [90, "XC"],
      [100, "C"],
      [400, "CD"],
      [500, "D"],
      [900, "CM"],
      [1000, "M"],
    ]);

    let result = "";

    const values = Array.from(romanNumerals.keys()).reverse();

    for (const value of values) {
      while (num >= value) {
        result += romanNumerals.get(value);
        num -= value;
      }
    }

    return result;
  }

  public uniquePaths(m: number, n: number): number {
    const dp: number[][] = Array.from({ length: m }, () => Array(n).fill(0));

    for (let i = 0; i < m; i++) {
      dp[i][0] = 1;
    }
    for (let j = 0; j < n; j++) {
      dp[0][j] = 1;
    }

    for (let i = 1; i < m; i++) {
      for (let j = 1; j < n; j++) {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
      }
    }

    return dp[m - 1][n - 1];
  }
}
function fullJustify(words: string[], maxWidth: number): string[] {
  let res: string[] = [];
  let line: string[] = [];
  let wordsLength: number = 0;
  let i = 0;
  while (i < Math.max(1, words.length)) {
    //Edge case1: if single word input, we can add spaces after it
    let currWord = words[i];
    if (currWord.length + wordsLength + (line.length - 1) < maxWidth) {
      // Being greedy
      let spacesLength = Math.max(1, line.length - 1);
      let availableLengthWithoutSpaces = maxWidth - wordsLength;
      let spacesToDistribute = Math.floor(
        availableLengthWithoutSpaces / spacesLength
      );
      let remainder = availableLengthWithoutSpaces % spacesLength;

      for (let j = 0; j < spacesLength; j++) {
        //Now distribute the spaces
        line[j] += " ".repeat(spacesToDistribute);
        if (remainder) {
          line[j] += " ";
          remainder--;
        }
      }
      res.push(line.join(""));
      line = [];
      wordsLength = 0;
    }
    line.push(currWord);
    wordsLength += currWord.length;
    i++;
  }
  let lastLine = line.join(" ");
  let trailingSpace = maxWidth - lastLine.length;
  res.push(lastLine + " " + trailingSpace);
  return res;
}

class VariableSizeWindow {
  // Fixed Size Map
  /**[1] */
  public minWindow(s: string, t: string): string {
    const map = new Map<string, number>();
    let reqiredLength = t.length,
      l = 0,
      r = 0,
      minWinLength = Infinity,
      minWinStart = 0;

    for (let char of t) map.set(char, (map.get(char) || 0) + 1);
    while (r < s.length) {
      if (map.has(s[r])) {
        if (map.get(s[r])! > 0) reqiredLength--;
        map.set(s[r], (map.get(s[r]) || 0) - 1);
      }
      r++;
      while (reqiredLength === 0) {
        if (r - l < minWinLength) {
          minWinLength = r - l;
          minWinStart = l;
        }
        if (map.has(s[l])) {
          if (map.get(s[l])! >= 0) reqiredLength++;
          map.set(s[l], (map.get(s[l]) || 0) + 1);
        }
        l++;
      }
    }
    if (minWinLength === Infinity) return "";
    return s.slice(minWinStart, minWinStart + minWinLength);
  }

  /**[2] */
  //Variable Size Map
  public longestUniqueCharacterSubstring(s: string): number {
    const map: Map<string, number> = new Map();
    let l = 0;
    let r = 0;
    let maxLength = 0;
    while (r < s.length) {
      if (map.has(s[r])) {
        for (let i = l; i < map.get(s[r])!; i++) map.delete(s[i]);
        l = map.get(s[r])! + 1;
      }
      maxLength = Math.max(maxLength, r - l + 1);
      map.set(s[r], r);
      r++;
      console.log(map);
    }
    return maxLength;
  }

  /**[3] */
  public largestSubarrayWithSumK(nums: number[], k: number): number[] {
    const map: Map<number, number> = new Map();
    const n = nums.length;
    let maxLength = 0;
    let start = 0;
    let sum = 0;

    for (let i = 0; i < n; i++) {
      sum += nums[i];

      if (sum === k) {
        maxLength = i + 1;
        start = 0;
      } else {
        const remaining = sum - k;
        if (map.has(remaining)) {
          const newLength = i - map.get(remaining)!;
          if (maxLength < newLength) {
            maxLength = newLength;
            start = map.get(remaining)! + 1;
          }
        }
      }
      if (!map.has(sum)) map.set(sum, i);
    }
    return nums.slice(start, start + maxLength);
  }

  /**[4] */
  public maxContiguous1sLength(nums: number[]): number {
    const map = new Map<number, number>();
    map.set(0, -1);
    let maxLen = 0;
    let count = 0;

    for (let i = 0; i < nums.length; i++) {
      count += nums[i] === 1 ? 1 : -1;
      if (map.has(count)) {
        maxLen = Math.max(maxLen, i - map.get(count)!);
      } else {
        map.set(count, i);
      }
    }

    return maxLen;
  }
}

export class FixedSizeWindow {
  /**[1]*/
  static minSubArrayOfSizeK(nums: number[], k: number): number[] {
    let minSum = Number.MAX_SAFE_INTEGER;
    let minStartIndex = -1;

    let sum = 0;
    for (let r = 0, l = 0; r < nums.length; r++) {
      sum += nums[r];

      while (r - l + 1 > k) {
        sum -= nums[l];
        l++;
      }

      if (r - l + 1 === k && sum < minSum) {
        minSum = sum;
        minStartIndex = l;
      }
    }
    return nums.slice(minStartIndex, minStartIndex + k);
  }
  // When window can break
  /**[2]*/
  static firstKNegativeSubArray(nums: number[], k: number): number[] {
    let count = 0;
    for (let r = 0, l = 0; r < nums.length; r++) {
      if (nums[r] >= 0) {
        count = 0;
        l = r + 1;
        continue;
      }
      if (r - l + 1 <= k) {
        count = count + 1;
        if (count === k) return [l, r];
      } else l++;
    }
    return [];
  }
  //When windows element needs to be tracked
  static minConsecutiveOnesToFlip0s(nums: number[], k: number): number {
    let maxConsecutiveOnes = 0;
    let l = 0;
    let zerosCount = 0;

    for (let r = 0; r < nums.length; r++) {
      if (nums[r] === 0) {
        zerosCount++;
      }
      while (zerosCount > k) {
        if (nums[l] === 0) {
          zerosCount--;
        }
        l++;
      }
      maxConsecutiveOnes = Math.max(maxConsecutiveOnes, r - l + 1);
    }

    return maxConsecutiveOnes;
  }
}

class TwoPointers {
  static threeSum(nums: number[], target: number): number[][] {
    nums.sort((a, b) => a - b);
    const result: number[][] = [];
    const visitedTriplets = new Set<string>();

    for (let i = 0; i < nums.length - 2; i++) {
      let left = i + 1;
      let right = nums.length - 1;

      while (left < right) {
        const sum = nums[i] + nums[left] + nums[right];
        if (sum === target) {
          const tripletStr = `${nums[i]},${nums[left]},${nums[right]}`;
          if (!visitedTriplets.has(tripletStr)) {
            result.push([nums[i], nums[left], nums[right]]);
            visitedTriplets.add(tripletStr);
          }
          left++;
          right--;
        } else if (sum < target) left++;
        else right--;
      }
    }

    return result;
  }
  static maxArea(height: number[]): number {
    let maxArea = 0;
    let l = 0;
    let r = height.length - 1;

    while (l < r) {
      const h = Math.min(height[l], height[r]);
      const area = h * (r - l);
      maxArea = Math.max(maxArea, area);
      if (height[l] < height[r]) {
        l++;
      } else {
        r--;
      }
      console.log(maxArea);
    }
    return maxArea;
  }

  static twoSum(numbers: number[], target: number): number[] {
    const sorted = numbers.sort((a, b) => a - b);
    let left = 0;
    let right = sorted.length - 1;

    while (left < right) {
      const sum = sorted[left] + sorted[right];

      if (sum === target) return [sorted[left], sorted[right]];
      else if (sum < target) left++;
      else right--;
    }

    return [];
  }

  static isSubsequence(s: string, t: string): boolean {
    let j = 0;
    for (let i = 0; i < t.length; i++) if (s[j] == t[i]) j++;
    return j === s.length;
  }
  static isPalindrome(s: string): boolean {
    s = s.replace(/[^a-zA-z0-9]/g, "").toLowerCase();
    let l = 0;
    let r = s.length - 1;

    while (l < r) {
      if (s[l] !== s[r]) return false;
      l++;
      r--;
    }
    return true;
  }
}

export class Grids {
  static spiralTraversal(matrix: number[][]): number[] {
    if (matrix.length === 0 || matrix[0].length === 0) return [];

    const result: number[] = [];
    let top = 0,
      bottom = matrix.length,
      left = 0,
      right = matrix[0].length;

    while (left < right && top < bottom) {
      for (let i = left; i < right; i++) result.push(matrix[top][i]);
      top++;
      for (let i = top; i < bottom; i++) result.push(matrix[i][right - 1]);
      right--;

      if (!(left < right && top < bottom)) break;

      for (let i = right - 1; i >= left; i--)
        result.push(matrix[bottom - 1][i]);
      bottom--;
      for (let i = bottom - 1; i >= top; i--) result.push(matrix[i][left]);
      left++;
    }

    return result;
  }

  static isValidSudoku(board: string[][]): boolean {
    const rows = new Map<number, Set<string>>();
    const cols = new Map<number, Set<string>>();
    const squares = new Map<string, Set<string>>();

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const cellValue = board[r][c];
        if (cellValue === ".") continue;

        // Initialize
        const squareKey = Math.floor(r / 3) + "-" + Math.floor(c / 3);
        if (!rows.has(r)) rows.set(r, new Set<string>());
        if (!cols.has(c)) cols.set(c, new Set<string>());
        if (!squares.has(squareKey)) squares.set(squareKey, new Set<string>());

        if (
          rows.get(r)!.has(cellValue) ||
          cols.get(c)!.has(cellValue) ||
          squares.get(squareKey)!.has(cellValue)
        )
          return false;

        rows.get(r)!.add(cellValue);
        cols.get(c)!.add(cellValue);
        squares.get(squareKey)!.add(cellValue);
      }
    }
    return true;
  }
  static rotate(matrix: number[][]): void {
    const n = matrix.length;

    for (let row = 0; row < n; row++) {
      for (let col = row + 1; col < n; col++) {
        [matrix[row][col], matrix[col][row]] = [
          matrix[col][row],
          matrix[row][col],
        ];
      }
    }

    for (let row = 0; row < n; row++) {
      matrix[row].reverse();
    }
  }

  static getMapOfAllArrays(m: number[][]): Map<number, number[]> {
    const result: Map<number, number[]> = new Map();
    const startIndex = 0;

    let sumRow: number[] = new Array(m[startIndex].length).fill(0);

    m.slice(startIndex).forEach((row, index) => {
      row.forEach((value, i) => (sumRow[i] += value));
      result.set(startIndex + index, [...sumRow]);
    });

    return result;
  }
}

class StacksEasy {
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

export class MapsEasy {
  /**[1]*/
  static isomorphicPattern(s: string, t: string): boolean {
    if (s.length !== t.length)
      throw new Error("Both String should be of equal length");
    const map = new Map<string, string>();

    for (let i = 0; i < s.length; i++) {
      if (map.has(s[i])) {
        if (map.get(s[i]) !== t[i]) return false;
      } else {
        if ([...map.values()].includes(t[i])) return false;
        map.set(s[i], t[i]);
      }
    }
    return true;
  }

  /**[2]*/
  static isWordPattern(p: string, s: string): boolean {
    if (p.length !== s.length)
      throw new Error("Both String shouold be of equal length");
    const map = new Map<string, string>();

    const words: string[] = s.split(" ");

    for (let i = 0; i < p.length; i++) {
      if (map.has(p[i])) {
        if (map.get(p[i]) !== words[i]) return false;
      } else {
        if ([...map.values()].includes(words[i])) return false;
        else map.set(p[i], words[i]);
      }
    }
    return true;
  }
  /**[3]*/
  static isAnagram(s: string, t: string): boolean {
    if (s.length !== t.length)
      throw new Error("Both String shouold be of equal length");

    const map = new Map<string, number>();

    [...t].forEach((char) => map.set(char, (map.get(char)! || 0) + 1));

    for (const char of s) {
      if (!map.has(char)) return false;

      const count = map.get(char)! - 1;
      if (count <= 0) map.delete(char);
      else map.set(char, count);
    }

    return map.size === 0;
  }
  /**[4]*/
  static canConstruct(s: string, t: string): boolean {
    const map = new Map<string, number>();
    [...t].forEach((char) => map.set(char, (map.get(char)! || 0) + 1));

    // for (let char of s) {
    //   map.set(char, (map.get(char)! || 0) - 1);
    //   if (map.get(char)! < 0) return false;
    // }
    for (const char of s) {
      if (!map.has(char)) return false;

      const count = map.get(char)! - 1;
      if (count <= 0) map.delete(char);
      else map.set(char, count);
    }
    return true;
  }
  /**[5]*/
  static groupAnagrams(strs: string[]): string[][] {
    const anagramMap = new Map<string, string[]>();

    for (const str of strs) {
      const sortedStr = str.split("").sort().join("");
      if (anagramMap.has(sortedStr)) {
        anagramMap.get(sortedStr)!.push(str);
      }
      anagramMap.set(sortedStr, []);
    }

    return [...anagramMap.values()];
  }

  /**[6]*/
  static twoSum(nums: number[], target: number): number[] {
    const numMap = new Map<number, number>();

    for (let i = 0; i < nums.length; i++) {
      const complement = target - nums[i];
      if (numMap.has(complement)) {
        return [numMap.get(complement)!, i];
      }
      numMap.set(nums[i], i);
    }

    throw new Error("No two sum solution");
  }

  /**[7]*/
  static sum(a: number[]): number {
    return a.reduce((acc, curr) => (curr += acc), 0);
  }
  static squares(n: number): number[] {
    let squares: number[] = [];
    let digit: number;
    while (n !== 0) {
      digit = n % 10;
      squares.push(Math.pow(digit, 2));
      n = Math.floor(n / 10);
    }
    return squares;
  }
  static isHappy(n: number): boolean {
    const map = new Map<number, number[]>();
    while (true) {
      if (map.has(n)) {
        const squareSum = this.sum(this.squares(n));
        if (squareSum === 1) return true;
        if (map.has(squareSum)) return false;
      } else {
        map.set(n, this.squares(n));
        n = this.sum(this.squares(n));
      }
    }
  }

  /**[8]*/
  static containsNearbyDuplicate(nums: number[], k: number): boolean {
    const map = new Map<number, number>();
    for (let i = 0; i < nums.length; i++) {
      const j = map.get(nums[i])!;
      const condition = map.has(nums[i]) && i - j <= k;

      if (condition) return true;
      map.set(nums[i], i);
    }
    return false;
  }

  /**[9]*/
  static longestConsecutive(nums: number[]): number[] {
    let numSet = new Set<number>(nums);
    let longestSeq: number[] = [];
    // let maxLength: number = 0;

    for (let num of nums) {
      if (!numSet.has(num - 1)) {
        let currentSeq: number[] = [];
        let curr = num;
        // let seqLength = 0;
        while (numSet.has(curr)) {
          currentSeq.push(curr);
          // seqLength++;
          curr++;
        }
        // maxLength = Math.max(maxLength, seqLength);
        if (longestSeq.length < currentSeq.length) longestSeq = currentSeq;
      }
    }
    return longestSeq;
  }
  /**[10]*/
  static largestSubarrayWithSumK(nums: number[], k: number): number[] {
    const map: Map<number, number> = new Map();
    const n = nums.length;
    let maxLength = 0;
    let start = 0;
    let sum = 0;

    for (let i = 0; i < n; i++) {
      sum += nums[i];
      const remaining = sum - k;
      if (!remaining) {
        maxLength = i + 1;
        start = 0;
      }
      if (map.has(remaining)) {
        const newLength = i - map.get(remaining)!;
        if (maxLength < newLength) {
          maxLength = newLength;
          start = map.get(remaining)! + 1;
        }
      }
      if (!map.has(sum)) map.set(sum, i);
    }
    return nums.slice(start, start + maxLength);
  }

  /**[11] */
  static lengthOfLongestSubstring(s: string): number {
    const charIndexMap = new Map<string, number>();
    let maxLength = 0;
    let start = 0;

    for (let end = 0; end < s.length; end++) {
      const char = s[end];
      if (charIndexMap.has(char)) {
        start = Math.max(start, charIndexMap.get(char)! + 1);
      }
      charIndexMap.set(char, end);
      maxLength = Math.max(maxLength, end - start + 1);
    }

    return maxLength;
  }

  /**[12] */
  static topKFrequent(nums: number[], k: number): number[] {
    const numMap = new Map<number, number>();
    for (const num of nums) {
      numMap.set(num, (numMap.get(num) || 0) + 1);
    }

    const sortedNums = Array.from(numMap.keys()).sort(
      (a, b) => numMap.get(b)! - numMap.get(a)!
    );
    return sortedNums.slice(0, k);
  }

  /**[13] */
  static wordFrequency(text: string): Map<string, number> {
    const words = text.toLowerCase().split(/\W+/).filter(Boolean);
    const freqMap = new Map<string, number>();

    for (const word of words) {
      freqMap.set(word, (freqMap.get(word) || 0) + 1);
    }

    return freqMap;
  }

  /**[Extra]*/
  static groupAnagrams2(strs: string[]): string[][] {
    let map = new Map<number, boolean>();
    for (let i = 0; i < strs.length; i++) {
      map.set(i, false);
    }
    let indexesArr: string[][] = [];
    for (let i = 0; i < strs.length; i++) {
      let indexes: string[] = [];
      for (let j = 0; j < strs.length; j++) {
        if (map.get(j) === false) {
          if (this.isAnagram(strs[i], strs[j])) {
            map.set(j, true);
            indexes.push(strs[j]);
          } else continue;
        } else continue;
      }
      indexesArr.push(indexes);
    }
    return indexesArr.filter((elem) => elem.length !== 0);
  }
}

const paragraph =
  "This is a sample paragraph. This paragraph contains multiple sentences.";

const inputWords = ["eat", "tea", "tan", "ate", "nat", "bat"];
