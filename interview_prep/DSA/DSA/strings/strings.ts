export class Strings {
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
