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
  static majorityElementBoyerMoore(a: number[]): number {
    let majorityElement = a[0],
      count = 1;
    for (let i = 1; i < a.length; i++) {
      count += a[i] === majorityElement ? 1 : -1;
      if (count < 1) [count, majorityElement] = [1, a[i]];
    }
    return majorityElement;
  }
  /**[6]*/
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
  /**[7]*/
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

  /**[8]*/
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

  /**[9]*/
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

  /**[10]*/
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

  /**[11]*/
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
  /**[12]*/
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
  /**[13]*/
  static candy(ratings: number[]) {
    const n = ratings.length;
    const candies = new Array(n).fill(1);

    for (let i = 1; i < n; i++) {
      if (ratings[i] > ratings[i - 1]) {
        candies[i] = candies[i - 1] + 1;
      }
    }
    for (let i = n - 2; i >= 0; i--) {
      if (ratings[i] > ratings[i + 1]) {
        candies[i] = Math.max(candies[i], candies[i + 1] + 1);
      }
    }

    return candies.reduce((total, current) => total + current, 0);
  }
  /**[14]*/
  static maximumSubArraySum(a: number[]): number {
    let maxSum = -Infinity;
    let sum = 0;
    for (const num of a) {
      sum = Math.max(num, sum + num);
      maxSum = Math.max(maxSum, sum);
    }
    return maxSum;
  }

  /**[15]*/
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

  /**[16]*/
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

  /**[17]*/
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

  /**[18]*/
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
  /**[19]*/
  static span(arr: number[]): number {
    let max = arr[0];
    let min = arr[0];
    for (let i = 0; i < arr.length; i++) {
      max = Math.max(max, arr[i]);
      min = Math.min(min, arr[i]);
    }
    return max - min;
  }
  /**[20]*/
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
  /**[21]*/
  static maxProfit2(prices: number[]): number {
    let maxProfit = 0;

    for (let i = 1; i < prices.length; i++) {
      if (prices[i] > prices[i - 1]) {
        maxProfit += prices[i] - prices[i - 1];
      }
    }
    return maxProfit;
  }
  /**[22]*/
  static jumpGame(nums: number[]): boolean {
    let goal = nums.length - 1;
    for (let i = nums.length - 2; i >= 0; i--)
      if (i + nums[i] >= goal) goal = i;
    return goal === 0;
  }
  /**[23]*/
  static jumpGame2(nums: number[]): number {
    if (nums.length <= 1) return 0;
    let jumps = 0;
    for (
      let [l, r, farthest] = [0, 0, 0];
      r < nums.length - 1;
      [l, r] = [r + 1, farthest]
    ) {
      for (let i = l; i < r + 1; i++)
        farthest = Math.max(i + nums[i], farthest);
      jumps++;
    }
    return jumps;
  }

  /**[24]*/
  static moveZeroes(nums: number[]): void {
    let l = 0;
    for (let r = 0; r < nums.length; r++) {
      if (nums[r] !== 0) {
        [nums[r], nums[l]] = [nums[l], nums[r]];
        l++;
      }
    }
  }
  /**[25]*/
  static removeNotValElements(nums: number[], val: number): number {
    let l = 0;
    for (let r = 0; r < nums.length; r++) {
      if (nums[r] !== val) {
        nums[l] = nums[r];
        l++;
      }
    }
    return l;
  }
  /**[26]*/
  static moveToLeftAsUniques(nums: number[]): number {
    if (nums.length === 0) return 0;

    let l = 1;
    for (let r = 1; r < nums.length; r++) {
      if (nums[r] !== nums[r - 1]) {
        nums[l] = nums[r];
        l++;
      }
    }
    return l;
  }
  /**[27]*/
  static moveToLeftAsPairs(nums: number[]): number {
    if (nums.length <= 2) return nums.length;

    let l = 2;
    for (let r = 2; r < nums.length; r++) {
      if (nums[r] !== nums[l - 1] || nums[r] !== nums[l - 2]) {
        nums[l] = nums[r];
        l++;
      }
    }
    return l;
  }
}
