export class FixedSizeWindow {
  //Handle r
  //Handle if array is larger, shrink it with 'While' loop
  //Handle if array is correct size or smaller
  /**[1]*/
  static minSumSubArrayOfSizeK(nums: number[], k: number): number[] {
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
  /**[2]*/
  static firstKNegativeSubArray(nums: number[], k: number): number[] {
    let count = 0;
    let l = 0;

    for (let r = 0; r < nums.length; r++) {
      if (nums[r] < 0) {
        count++;
      } else {
        count = 0;
        l = r + 1;
        continue;
      }

      while (r - l + 1 > k) {
        if (nums[l] < 0) {
          count--;
        }
        l++;
      }

      if (count === k) {
        return nums.slice(l, r + 1);
      }
    }

    return [];
  }

  /**[3]*/
  static maxConsecutiveOnes(nums: number[], k: number): number {
    let maxConsecutiveOnes = 0;
    let l = 0;
    let flipCount = 0;

    for (let r = 0; r < nums.length; r++) {
      if (nums[r] === 0) {
        flipCount++;
      }

      while (flipCount > k) {
        if (nums[l] === 0) {
          flipCount--;
        }
        l++;
      }

      maxConsecutiveOnes = Math.max(maxConsecutiveOnes, r - l + 1);
    }

    return maxConsecutiveOnes;
  }
  /**[4]*/
  // replace up to k characters in s to create the longest possible substring where all characters are the same
  //Input: s = "AABABBA", k = 1
  //Output: 4  // Replace one 'B' to get "AAAA" or one 'A' to get "BBBB"
  static characterReplacement(s: string, k: number): number {
    const charCount = new Map<string, number>();
    let maxFreq = 0; // Track the highest frequency of a single character in the current window
    let maxLength = 0;

    for (let l = 0, r = 0; r < s.length; r++) {
      // Update the count of the current character
      const rc = s[r];
      charCount.set(rc, (charCount.get(rc) || 0) + 1);
      // Update maxFreq based on the current window
      maxFreq = Math.max(maxFreq, charCount.get(rc)!);
      // If current window size - maxFreq > k, it's not valid, shrink window from the l
      while (r - l + 1 > k + maxFreq) {
        const lc = s[l];
        charCount.set(lc, charCount.get(lc)! - 1);
        l++;
      }
      // Update maxLength with the size of the valid window
      maxLength = Math.max(maxLength, r - l + 1);
    }
    return maxLength;
  }
}
