export class ArrayLeetcode150 {
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
  static jumpGame(nums: number[]): boolean {
    let goal = nums.length - 1;
    for (let i = nums.length - 2; i >= 0; i--)
      if (i + nums[i] >= goal) goal = i;
    return goal === 0;
  }
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
  static maxProfit2(prices: number[]): number {
    let maxProfit = 0;

    for (let i = 1; i < prices.length; i++) {
      if (prices[i] > prices[i - 1]) {
        maxProfit += prices[i] - prices[i - 1];
      }
    }
    return maxProfit;
  }

  static removeElement(nums: number[], val: number): number {
    let l = 0;
    for (let r = 0; r < nums.length; r++) {
      if (nums[r] !== val) {
        nums[l] = nums[r];
        l++;
      }
    }
    return l;
  }
  static removeDuplicates(nums: number[]): number {
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

  static removeDuplicates2(nums: number[]): number {
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
    } else return false;
  }

  remove(val: number): boolean {
    const index = this.set.indexOf(val);
    if (index !== -1) {
      this.set.splice(index, 1);
      return true;
    } else return false;
  }

  getRandom(): number {
    if (this.set.length === 0) return -1;
    else return this.set[Math.floor(Math.random() * this.set.length)];
  }
}
