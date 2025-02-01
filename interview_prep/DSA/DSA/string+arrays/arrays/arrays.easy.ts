/**[1] */
function majorityElementBoyerMoore(nums: number[]): number {
  let [majorityElement, count] = [nums[0], 1];

  for (let i = 1; i < nums.length; i++) {
    count += nums[i] === majorityElement ? 1 : -1;
    if (count < 1) [majorityElement, count] = [nums[i], 1];
  }
  return majorityElement;
}

/**[2] */ //O(n), Kadane's algorithm
function maxSubArraySum(nums: number[]): number {
  let [sum, maxSum] = [0, -Infinity];

  for (const num of nums) {
    sum = Math.max(num, sum + num);
    maxSum = Math.max(maxSum, sum);
  }
  return maxSum;
}

/**[3] */ //O(n)
function maxSumSubArray(nums: number[]): number[] {
  let [sum, maxSum] = [nums[0], nums[0]];
  let [start, temp, end] = [0, 0, 0];

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] <= sum + nums[i]) sum = sum + nums[i];
    else {
      sum = nums[i];
      temp = i;
    }
    if (sum > maxSum) {
      maxSum = sum;
      start = temp;
      end = i;
    }
  }
  return nums.slice(start, end + 1);
}

/**[4] */
function longestConsecutiveSequence(nums: number[]): number[] {
  if (nums.length === 0) return [];

  let set = new Set<number>(nums);
  let longestSeq: number[] = [];

  for (let num of nums) {
    if (set.has(num - 1)) continue;

    let currentSeq: number[] = [];
    let currNum = num;

    while (set.has(currNum)) {
      currentSeq.push(currNum);
      currNum++;
    }
    if (longestSeq.length < currentSeq.length) longestSeq = currentSeq;
  }
  return longestSeq;
}

/**[5] */
function longestConsecutiveSubSequence(nums: number[]): number {
  if (nums.length === 0) return 0;

  let [count, max] = [1, 1];

  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] === nums[i + 1] - 1) count++;
    else count = 1;
    max = Math.max(max, count);
  }
  return max;
}

/**[6] */ //O(n)
function longestAlternatingEvenOdd(a: number[]): number {
  if (a.length === 0) return 0;

  let [count, longest] = [1, 1];

  for (let i = 1; i < a.length; i++) {
    const isOddEven = a[i - 1] % 2 !== 0 && a[i] % 2 === 0;
    const isEvenOdd = a[i - 1] % 2 === 0 && a[i] % 2 !== 0;

    if (isOddEven || isEvenOdd) count++;
    else count = 1;
    longest = Math.max(longest, count);
  }
  return longest;
}

/**[7] */ // O(n)
function minMovesMovesToMakeAllElementsEqual(nums: number[]): number {
  if (nums.length === 0) return 0;

  nums.sort((a, b) => a - b);

  let moves = 0;
  const median = nums[Math.floor(nums.length / 2)];

  for (const num of nums) {
    moves += Math.abs(num - median);
  }
  return moves;
}

/**[8] */
function findLeaders(a: number[]): number[] {
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

/**[9] */
function rotateArray(nums: number[], k: number): void {
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

/**[10] */
function searchInRotatedArray(nums: number[], target: number): number {
  let l = 0;
  let h = nums.length - 1;

  while (l <= h) {
    const m = Math.floor((l + h) / 2);

    if (nums[m] === target) return m;
    // Left-half is sorted
    if (nums[l] <= nums[m]) {
      if (nums[l] <= target && target < nums[m]) h = m - 1;
      else l = m + 1;
    }
    // Right-half is sorted
    else {
      if (nums[m] < target && target <= nums[h]) l = m + 1;
      else h = m - 1;
    }
  }
  return -1; // Target not found
}

/**[11] */
function getSecondLargestAndSecondSmallest(
  nums: number[]
): [number | null, number | null] {
  const arr = Array.from(new Set(nums));

  let [secondLargest, secondSmallest] = [-Infinity, Infinity];
  let [min, max] = [Math.min(...arr), Math.max(...arr)];

  if (!arr.length) return [null, null];

  for (const curr of arr) {
    if (secondLargest < curr && curr < max) secondLargest = curr;
    if (min < curr && curr < secondSmallest) secondSmallest = curr;
  }

  return [
    secondLargest === -Infinity ? null : secondLargest,
    secondSmallest !== Infinity ? secondSmallest : null,
  ];
}

/**[12] */
function getFloorAndCeil(
  target: number,
  nums: number[]
): [number | null, number | null] {
  let [floor, ceil] = [-Infinity, Infinity]; // Start with null as initial values

  for (const curr of nums) {
    if (floor < curr && curr <= target) floor = curr;
    if (target <= curr && curr < ceil) ceil = curr;
  }

  return [floor === -Infinity ? null : floor, ceil === Infinity ? null : ceil];
}

/**[13] */
function productExceptSelf(nums: number[]): number[] {
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

/**[14] */
function candy(ratings: number[]) {
  const candies = new Array(ratings.length).fill(1);

  for (let i = 1; i < ratings.length; i++) {
    if (ratings[i] > ratings[i - 1]) {
      candies[i] = candies[i - 1] + 1;
    }
  }
  for (let i = ratings.length - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      candies[i] = Math.max(candies[i], candies[i + 1] + 1);
    }
  }

  return candies.reduce((total, current) => total + current, 0);
}

/**[15]*/
function maxProfit(prices: number[]): number {
  if (prices.length === 0) return 0;

  let minPrice = prices[0];
  let maxProfit = 0;
  for (let i = 1; i < prices.length; i++) {
    minPrice = Math.min(minPrice, prices[i]);
    maxProfit = Math.max(maxProfit, prices[i] - minPrice);
  }
  return maxProfit;
}

/**[16]*/
function maxProfit2(prices: number[]): number {
  let maxProfit = 0;

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      maxProfit += prices[i] - prices[i - 1];
    }
  }
  return maxProfit;
}

/**[17]*/
function jumpGame(nums: number[]): boolean {
  let goal = nums.length - 1;
  for (let i = nums.length - 2; i >= 0; i--) if (i + nums[i] >= goal) goal = i;
  return goal === 0;
}

/**[18]*/
function jumpGame2(nums: number[]): number {
  if (nums.length <= 1) return 0;
  let jumps = 0;
  for (
    let [l, r, farthest] = [0, 0, 0];
    r < nums.length - 1;
    [l, r] = [r + 1, farthest]
  ) {
    for (let i = l; i < r + 1; i++) farthest = Math.max(i + nums[i], farthest);
    jumps++;
  }
  return jumps;
}

/**[19]*/
function moveZeroes(nums: number[]): void {
  let l = 0;
  for (let r = 0; r < nums.length; r++) {
    if (nums[r] !== 0) {
      [nums[r], nums[l]] = [nums[l], nums[r]];
      l++;
    }
  }
}

/**[20]*/
function removeNotValElements(nums: number[], val: number): number {
  let l = 0;
  for (let r = 0; r < nums.length; r++) {
    if (nums[r] !== val) {
      nums[l] = nums[r];
      l++;
    }
  }
  return l;
}

/**[21]*/
function moveToLeftAsUniques(nums: number[]): number {
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

/**[22]*/
function moveToLeftAsPairs(nums: number[]): number {
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

/**[23]*/
function canCompleteCircuit(gas: number[], cost: number[]) {
  const sumGas = gas.reduce((acc, curr) => (acc += curr), 0);
  const sumCost = cost.reduce((acc, curr) => (acc += curr), 0);
  if (sumGas < sumCost) return -1;

  let [total, start] = [0, 0];
  for (let i = 0; i < gas.length; i++) {
    total += gas[i] - cost[i];
    if (total < 0) {
      total = 0;
      start = i + 1;
    }
  }
  return start;
}

/**[24]*/
function minConsecutiveMoves(nums: number[]): number {
  //O(n^2)
  if (nums.length === 0) return 0;
  let minMoves = Infinity;

  for (let i = 0; i < nums.length; i++) {
    let moves = 0;
    for (let j = 0; j < nums.length; j++) {
      moves += Math.abs(nums[i] - nums[j]);
    }
    minMoves = Math.min(minMoves, moves);
  }
  return minMoves;
}
function minMovesMovesOptmzd(nums: number[]): number {
  //O(n)
  //O(n)
  if (nums.length === 0) return 0;

  // Sort the array
  nums.sort((a, b) => a - b);

  const median = nums[Math.floor(nums.length / 2)];
  let moves = 0;
  for (const num of nums) {
    moves += Math.abs(num - median);
  }
  return moves;
}
