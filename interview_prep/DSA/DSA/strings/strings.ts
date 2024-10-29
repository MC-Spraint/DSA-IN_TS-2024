export class Strings {
// str = "newyorkcitynewyorkcitynewyorkcitycitynewyorkcitycitycitynewyorkcity", 
// target = newyork
// Question: How many times "newyork" character appears?

public countOccurrences(str, target) {
  if (str.length < target.length) {
    return 0;
  }

  if (str.startsWith(target)) {
    return 1 + this.countOccurrences(str.slice(target.length), target);
  } else {
    return this.countOccurrences(str.slice(1), target);
  }
}
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
  public longestCommonSubstring(str1: string, str2: string): string {
    let longest = '';
    for (let i = 0; i < str1.length; i++) {
        for (let j = 0; j < str2.length; j++) {
            let k = 0;
            while (str1[i + k] && str2[j + k] && str1[i + k] === str2[j + k]) {
                k++;
            }
            if (k > longest.length) {
                longest = str1.slice(i, i + k);
            }
        }
    }
    return longest;
  }
  public longestSubstring(s: string): string {
    const map: Map<string, number> = new Map();
    let maxLength = 0;
    let start = 0;
    let longestStart = 0;
    let longestEnd = 0;

    for (let end = 0; end < s.length; end++) {
        if (map.has(s[end])) {
            start = Math.max(map.get(s[end])! + 1, start);
        }
        map.set(s[end], end);
        if (end - start + 1 > maxLength) {
            maxLength = end - start + 1;
            longestStart = start;
            longestEnd = end;
        }
    }

    return s.slice(longestStart, longestEnd + 1);
}

  /**[7] */
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
  /**[8] */
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
  /**[9] */
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
  /**[10] */
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

  /**[11] */
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

function compressString(str: string): string {
  let compressed = '';
  let count = 1;
  for (let i = 0; i < str.length; i++) {
      if (str[i] === str[i + 1]) {
          count++;
      } else {
          compressed += `${str[i]}${count}`;
          count = 1;
      }
  }
  return compressed.length < str.length ? compressed : str;
}
function isRotation(str1: string, str2: string): boolean {
  if (str1.length !== str2.length) return false;
  const concatenated = str1 + str1;
  return concatenated.includes(str2);
}
function firstNonRepeatingChar(str: string): string {
  const charCount = {};
  for (let char of str) {
      charCount[char] = charCount[char] ? charCount[char] + 1 : 1;
  }
  for (let char of str) {
      if (charCount[char] === 1) {
          return char;
      }
  }
  return '';
}
function uniquePaths(m: number, n: number): number {
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