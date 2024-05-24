export class ArrayLeetcode150 {
  static removeElement(nums: number[], val: number): number {
    let k = 0; // Index to keep track of the position for non-val elements

    // Iterate through the array
    for (let i = 0; i < nums.length; i++) {
      // If the current element is not equal to val, move it to the position indicated by k
      if (nums[i] !== val) {
        nums[k] = nums[i];
        k++;
      }
    }

    return k; // Return the number of non-val elements
  }
  static jump(nums: number[]): boolean {
    let lastPosition = nums.length - 1; // Last index to reach

    // Iterate backwards from the second last position
    for (let i = nums.length - 2; i >= 0; i--) {
      // Check if the maximum jump length from the current position can reach or go beyond lastPosition
      if (nums[i] >= lastPosition - i) {
        lastPosition = i; // Update lastPosition to the current index
      }
    }

    // If lastPosition reaches the start (0 index), it means it's possible to reach the last index
    return lastPosition === 0;
  }
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

  static hIndex(citations: number[]): number {
    citations.sort((a, b) => a - b);

    let hIndex = 0;
    let n = citations.length;

    for (let i = 0; i < n; i++) {
      // The h-index is the maximum value of h such that citations[i] >= i + 1
      if (citations[i] >= n - i) {
        hIndex = Math.max(hIndex, n - i);
      }
    }

    return hIndex;
  }
  static maxProfit2(prices: number[]): number {
    let maxProfit = 0;

    for (let i = 1; i < prices.length; i++) {
      if (prices[i] > prices[i - 1]) {
        maxProfit += prices[i] - prices[i - 1];
      }
    }

    return maxProfit;
  }
  static merge(nums1: number[], m: number, nums2: number[], n: number): void {
    let i = m - 1; // Index for nums1
    let j = n - 1; // Index for nums2
    let k = m + n - 1; // Index for the merged array

    // Merge nums1 and nums2 from the end
    while (i >= 0 && j >= 0) {
      if (nums1[i] > nums2[j]) {
        nums1[k] = nums1[i];
        i--;
      } else {
        nums1[k] = nums2[j];
        j--;
      }
      k--;
    }

    // Copy remaining elements of nums2 if any
    while (j >= 0) {
      nums1[k] = nums2[j];
      j--;
      k--;
    }
  }


  static removeDuplicates(nums: number[]): number {
    if (nums.length === 0) return 0; // Edge case: empty array

    let k = 1; // Index to keep track of the position for unique elements

    // Iterate through the array starting from the second element
    for (let i = 1; i < nums.length; i++) {
      // If the current element is different from the previous element, move it to the position indicated by k
      if (nums[i] !== nums[i - 1]) {
        nums[k] = nums[i];
        k++;
      }
    }

    return k; // Return the number of unique elements
  }

  static removeDuplicates2(nums: number[]): number {
    if (nums.length <= 2) return nums.length; // Edge case: array length <= 2

    let k = 2; // Index to keep track of the position for the next unique element

    // Iterate through the array starting from the third element
    for (let i = 2; i < nums.length; i++) {
      // If the current element is different from the two elements before it, include it in the result array
      if (nums[i] !== nums[k - 1] || nums[i] !== nums[k - 2]) {
        nums[k] = nums[i];
        k++;
      }
    }

    return k; // Return the number of unique elements
  }

  static majorityElementBoyerMoore(a: number[]): number {
    let majorityElement = a[0],
      count = 1;
    for (let i = 1; i < a.length; i++) {
      count += a[i] === majorityElement ? 1 : -1;
      if (count === 0) {
        count = 1;
        majorityElement = a[i];
      }
    }
    return majorityElement;
  }
  static maxProfit(prices: number[]): number {
    if (prices.length === 0) return 0;

    let minPrice = prices[0];
    let maxProfit = 0;

    for (let i = 1; i < prices.length; i++) {
      minPrice = Math.min(minPrice, prices[i]);

      maxProfit = Math.max(maxProfit, prices[i] - minPrice);
    }

    return maxProfit; // Return the maximum profit
  }

}
class RandomizedSet {
  set: Array<number>;
  constructor() {
      this.set = new Array<number>();
  }
  
  insert(val: number): boolean {
      if (!this.set.includes(val)) {
          this.set.push(val);
          return true;
      }
      else return false;
  }

  remove(val: number): boolean {
      const index = this.set.indexOf(val);
      if (index !== -1) {
          this.set.splice(index, 1);
          return true;
      }
      else return false;
  }

  getRandom(): number {
      if(this.set.length === 0) return -1;
      else return this.set[Math.floor(Math.random() * this.set.length)];
  }
}
