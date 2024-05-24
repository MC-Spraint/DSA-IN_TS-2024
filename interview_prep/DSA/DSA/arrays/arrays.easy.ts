export class ArraysEasy {
  /**[1]*/
  static removeDuplicates(arr: number[]): number[] {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  }
  /**[2]*/
  static inverse(arr: number[]): number[] {
    const inv: number[] = new Array(arr.length);

    for (let i = 0; i < arr.length; i++) {
      inv[arr[i]] = i;
    }
    return inv;
  }
  /**[3]*/
  static twoSum(a: number[], targetSum: number): number[] {
    const map = new Map<number, number>();
    for (let i = 0; i < a.length; i++) {
      const complement = targetSum - a[i];
      if (map.has(complement)) return [map.get(complement)!, i];
      map.set(a[i], i);
    }
    throw new Error("No two sum solution");
  }

  /**[4]*/
  static findLeaders(a: number[]): number[] {
    let maxRight = a[a.length - 1];
    let leaders: number[] = [maxRight];
    for (let i = a.length - 2; i >= 0; i--) {
      if (a[i] > maxRight) {
        maxRight = a[i];
        leaders.push(maxRight);
      }
    }
    return leaders;
  }
  /**[5]*/
  static maxProfit(prices: number[]): number {
    if (prices.length === 0) return 0;

    let minPrice = prices[0];
    let maxProfit = 0;
    for (let i = 1; i < prices.length; i++) {
      minPrice = Math.min(minPrice, prices[i]);
      maxProfit = Math.max(maxProfit, prices[i] - minPrice);
    }
    return maxProfit;
  }

  /**[6]*/
  static moveZeroes(nums: number[]): void {
    let zeroToMoveAt = 0;
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] !== 0) {
        [nums[i], nums[zeroToMoveAt]] = [nums[zeroToMoveAt], nums[i]];
        zeroToMoveAt++;
      }
    }
  }

  /**[7]*/
  static majorityElementBoyerMoore(a: number[]): number {
    let majorityElement = a[0],
      count = 1;
    for (let i = 1; i < a.length; i++) {
      count += a[i] === majorityElement ? 1 : -1;
      if (count === 0) [count, majorityElement] = [1, a[i]];
    }
    return majorityElement;
  }
  /**[8]*/
  static maxConsecutiveNumbers(arr: number[], num: number): number {
    let counter = 0;
    let max = 0;
    for (const e of arr) {
      if (e === num) {
        counter++;
        max = Math.max(max, counter);
      } else counter = 0;
    }
    return max;
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
  static ceilAndFloors(
    nums: number[]
  ): [Map<number, number>, Map<number, number>] {
    const ceils = new Map<number, number>();
    const floors = new Map<number, number>();

    for (let i = 0; i < nums.length; i++) {
      let ceil = Number.MAX_SAFE_INTEGER;
      let floor = Number.MIN_SAFE_INTEGER;
      for (let j = 0; j < nums.length; j++) {
        if (nums[i] < nums[j] && nums[j] < ceil && i !== j) ceil = nums[j];
        if (nums[i] > nums[j] && nums[j] > floor && i !== j) floor = nums[j];
      }
      if (ceil === Number.MAX_SAFE_INTEGER) ceil = nums[i];
      if (floor === Number.MIN_SAFE_INTEGER) floor = nums[i];
      ceils.set(nums[i], ceil);
      floors.set(nums[i], floor);
    }
    return [ceils, floors];
  }

  /**[11]*/
  static secondLargestElement(arr: number[]): number {
    let max = arr[0];
    for (let i = 0; i < arr.length; i++) {
      max = Math.max(max, arr[i]);
    }

    let floor = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i < arr.length; i++) {
      const condition =
        max > arr[i] && arr[i] > floor && i !== arr.indexOf(max);
      if (condition) floor = arr[i];
    }
    return floor;
  }
  /**[12]*/
  static span(arr: number[]): number {
    let max = arr[0];
    let min = arr[0];
    for (let i = 0; i < arr.length; i++) {
      max = Math.max(max, arr[i]);
      min = Math.min(min, arr[i]);
    }
    return max - min;
  }
  /**[13]*/

  static productExceptSelf(nums: number[]): number[] {
    let output: number[] = [];
    let product = 1;
    for (let i = nums.length - 1; i >= 0; i--) {
      output[i] = product;
      product *= nums[i];
    }
    product = 1;
    for (let i = 0; i < nums.length; i++) {
      output[i] *= product;
      product *= nums[i];
    }

    return output;
  }

  /**[14]*/
  static rotateArray(nums: number[], k: number): void {
    const reverse = (nums: number[], start: number, end: number): void => {
      while (start < end) {
        [nums[start], nums[end]] = [nums[end], nums[start]];
        start++;
        end--;
      }
    };
    const n = nums.length - 1;
    k = k % n;

    reverse(nums, 0, k - 1);
    reverse(nums, k, n);
    reverse(nums, 0, n);
    //Reverse the entire array at last to rotate to left
    //Reverse the entire array at first to rotate to right
  }

  /**[15]*/
  static searchInRotatedArray(nums: number[], target: number): number {
    let l = 0;
    let r = nums.length - 1;

    while (l <= r) {
      const m = Math.floor((l + r) / 2);
      if (nums[m] === target) return m;

      if (nums[l] <= nums[m]) {
        if (nums[l] <= target && target < nums[m]) r = m - 1;
        else l = m + 1;
      } else {
        if (nums[m] < target && target <= nums[r]) l = m + 1;
        else r = m - 1;
      }
    }
    return -1;
  }
  /**[16]*/
  static maximumSubArraySum(a: number[]): number {
    let maxSum = -Infinity;
    let sum = 0;
    for (const i of a) {
      sum = Math.max(i, sum + i);
      maxSum = Math.max(maxSum, sum);
    }
    return maxSum;
  }

  /**[17]*/
  longestSubarrayWithKSum(nums: number[], k: number): number {
    const map = new Map<number, number>();
    let maxLength = 0;
    let sum = 0;

    for (let i = 0; i < nums.length; i++) {
      sum += nums[i];

      if (sum === k) {
        maxLength = i + 1;
      } else if (map.has(sum - k)) {
        maxLength = Math.max(maxLength, i - map.get(sum - k)!);
      }

      if (!map.has(sum)) map.set(sum, i);
    }

    return maxLength;
  }

  /**[18]*/

  static LongestAlternatingEvenOddSubArray(a: number[]): number {
    if (a.length === 0) return 0;
    let count = 1;
    let result = 0;
    for (let i = 1; i < a.length; i++) {
      const isOddEven = a[i - 1] % 2 !== 0 && a[i] % 2 === 0;
      const isEvenOdd = a[i - 1] % 2 === 0 && a[i] % 2 !== 0;

      if (isOddEven || isEvenOdd) count++;
      else count = 1;

      result = Math.max(result, count);
    }
    return result;
  }

  /**[19]*/
  static minConsecutiveMoves(nums: number[]): number {
    if (nums.length === 0) return Infinity;

    let min = Infinity;
    let sum = 0;
    for (const num of nums) {
      sum += num;
    }
    for (let i = 0; i < nums.length; i++) {
      min = Math.min(min, sum - nums.length * nums[i]);
    }
    return min;
  }

  /**[20]*/
  static minConsecutiveOnes(nums: number[], k: number): number {
    let maxConsecutiveOnes = 0;
    let left = 0;
    let zerosCount = 0;

    for (let right = 0; right < nums.length; right++) {
      if (nums[right] === 0) {
        zerosCount++;
      }
      while (zerosCount > k) {
        if (nums[left] === 0) {
          zerosCount--;
        }
        left++;
      }
      maxConsecutiveOnes = Math.max(maxConsecutiveOnes, right - left + 1);
    }

    return maxConsecutiveOnes;
  }
}
