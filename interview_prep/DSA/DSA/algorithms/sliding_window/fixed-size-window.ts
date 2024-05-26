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
