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
    const seen = new Set<number>();
  
    while (true) {
      if(seen.has(n)){
        const squareSum = this.sum(this.squares(n));
        if(squareSum === 1) return true;
        if(seen.has(squareSum)) return false;
      }
      else{
        seen.add(n);
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
        if(map.has(remaining)) {
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
  static isHappy2(n: number): boolean {
    const map = new Map<number, number>();
    while (true) {
        if (n === 1) return true;
        if (map.has(n)) return false;

        const squareSum = this.sum(this.squares(n));
        map.set(n, squareSum);
        n = squareSum;
    }
}

}


const paragraph =
  "This is a sample paragraph. This paragraph contains multiple sentences.";

const inputWords = ["eat", "tea", "tan", "ate", "nat", "bat"];