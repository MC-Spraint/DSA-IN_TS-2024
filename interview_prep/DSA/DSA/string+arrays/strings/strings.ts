export class Strings {
  public occurenceOfSubstr(s: string, occurence: string) {
    if (s.length < occurence.length) {
      return 0;
    }

    if (s.startsWith(occurence)) {
      return 1 + this.occurenceOfSubstr(s.slice(occurence.length), occurence);
    } else {
      return this.occurenceOfSubstr(s.slice(1), occurence);
    }
  }

  public countNumLettSymb(str: string) {
    let map: Map<string, number> = new Map<string, number>([
      ["Number", 0],
      ["Letter", 0],
      ["Symbols", 0],
    ]);

    for (const char of str) {
      if (/[0-9]/g.test(char)) {
        map.set("Number", (map.get("Number")! || 0) + 1);
      } else if (/[a-zA-Z]/g.test(char)) {
        map.set("Letter", (map.get("Letter")! || 0) + 1);
      } else {
        if (/[^a-zA-Z0-9\s]g/.test(char))
          map.set("Symbols", (map.get("Symbols")! || 0) + 1);
      }
    }
    return map;
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
      const spaceIndex = str.indexOf(" ");
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
    let minLen = strs[0].length;
    strs.forEach((s) => {
      minLen = Math.min(minLen, s.length);
    });

    let commonPrefix: string = "";
    for (let i = 0; i <= minLen; i++) {
      let na: string[] = [];
      for (let j = 0; j < strs.length; j++) {
        if (strs[0][i] === strs[j][i]) na.push(strs[j][i]);
      }
      if (na.length !== strs.length) {
        return commonPrefix;
      }
      const [common] = na;
      if (common) commonPrefix += common;
    }
    return commonPrefix;
  }
  /**[6] */
  public longestCommonSubstring(str1: string, str2: string): string {
    let longest = "";
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
  public longestSubstringWithoutRepeatingChars(s: string): string {
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

// Input: words = ["This", "is", "an", "example", "of", "text", "justification."], width = 16
// Output: [   "This    is    an",   "example  of text",   "justification.  "]
private distributeSpacesInline(inlineWords: string[], charCountOfInlineWords: number, maxWidth: number): string {
  const totalSpaces = maxWidth - charCountOfInlineWords;
  const slots = inlineWords.length - 1;
  //No slot between words means the inlineWords has a single word
  if(slots === 0) return inlineWords[0] + " ".repeat(totalSpaces);

  //Calculate distribution of 'spacesPerGap' and 'extraSpaces' if distribution is not evenly
  const spacesPerGap = Math.floor(totalSpaces / slots);
  let extraSpaces = totalSpaces % slots;
  
  //Construct the string from the inlineWords
  return inlineWords.reduce((str, word, i) => {
      //If it's the last word, add it and return
      if (i === inlineWords.length - 1) return str + word;
      //Before adding the 'extraSpaces' to the end of a word if it is more than 1, reduce it by 1
      /*
      Because If the number of spaces on a inlineWords does not divide evenly between words,
      the empty slots on the left will be assigned more spaces than the slots on the right.(Mentioned)
      */
      return str + word + " ".repeat(spacesPerGap + (extraSpaces -- > 0 ? 1 : 0));
  }, "");
}
private leftJustifyLine(inlineWords: string[], maxWidth: number): string {
  const line = inlineWords.join(" ");
  return line + " ".repeat(maxWidth - line.length);
}
public fullJustify(words: string[], maxWidth: number): string[] {
  const res: string[] = [];
  
  let inlineWords: string[] = [];
  let charCountOfInlineWords = 0;
  words.forEach((word) => {
      
      //Length of (previous words + new word + spaces in between)
      if ((charCountOfInlineWords + word.length + inlineWords.length > maxWidth)) {
          res.push(this.distributeSpacesInline(inlineWords, charCountOfInlineWords, maxWidth));
        
          inlineWords = [];
          charCountOfInlineWords = 0;
      }
      inlineWords.push(word);
      charCountOfInlineWords += word.length;
  });
  res.push(this.leftJustifyLine(inlineWords, maxWidth));
  
  return res;
}

  /**[8] */
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
  static getVal(char: string, arr: [string, number][]): number {
    for (let a of arr) if (a[0] === char) return a[1];
    return 0;
  }

  /**[9] */
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
  /**[10] */
  public compressString(s: string): string {
    let compressed = "";
    let count = 1;

    for (let i = 1; i < s.length; i++) {
        if (s[i] === s[i - 1]) {
            count++;
        } else {
            compressed += `${s[i - 1]}${(count > 1 ? count : "")}`;
            count = 1;
        }
    }
    compressed += s[s.length - 1] + (count > 1 ? count : "");
    return compressed.length < s.length ? compressed : s;
}
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
  return "";
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
