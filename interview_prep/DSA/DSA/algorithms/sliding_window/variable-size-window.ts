export class VariableSizeWindow {
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
      } else if (map.has(sum - k)) {
        if (maxLength < i - map.get(sum - k)!) {
          maxLength = i - map.get(sum - k)!;
          start = map.get(sum - k)! + 1;
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
