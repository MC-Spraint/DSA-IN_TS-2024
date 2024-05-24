export class ArraysHard {


  static findBitonicPoint(a: number[]): number {
    let left = 0;
    let right = a.length - 1;
    if (a.length === 1) return 0;
    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);
      if (mid <= 0 || mid >= a.length - 1) return -1;
      if (a[mid - 1] < a[mid] && a[mid] > a[mid + 1]) return mid;
      else if (a[mid - 1] < a[mid] && a[mid] < a[mid + 1]) left = mid + 1;
      else right = mid - 1;
    }
    return -1;
  }

  static medianOfTwoSortedArrays(arr1: number[], arr2: number[]): number {
    const totalLength = arr1.length + arr2.length;
    const isEven = totalLength % 2 === 0;
    const m = totalLength / 2;

    // Ensure arr1 is the smaller array
    if (arr1.length > arr2.length) {
      [arr1, arr2] = [arr2, arr1];
    }

    let start = 0, end = arr1.length;
    while (start <= end) {
      const m1 = Math.floor((start + end) / 2);
      const m2 = m - m1;

      const l1 = m1 === 0 ? Number.MIN_SAFE_INTEGER : arr1[m1 - 1];
      const l2 = m2 === 0 ? Number.MIN_SAFE_INTEGER : arr2[m2 - 1];
      const r1 = m1 === arr1.length ? Number.MAX_SAFE_INTEGER : arr1[m1];
      const r2 = m2 === arr2.length ? Number.MAX_SAFE_INTEGER : arr2[m2];

      if (l1 <= r2 && l2 <= r1) {
        if (isEven) {
          return (Math.max(l1, l2) + Math.min(r1, r2)) / 2;
        } else {
          return Math.min(r1, r2);
        }
      } else if (l1 > r2) {
        end = m1 - 1;
      } else {
        start = m1 + 1;
      }
    }

    throw new Error("Input arrays are not sorted or not of the same length.");
  }

  static woodCuttingProblem(trees: number[], unit: number): number {
    let maxUnit = 0;
    let minIndex = -1; // Initialize with an invalid value
    let minUnit = -1; // Initialize with an invalid value


    // Find the maximum height
    for (const height of trees) {
      if (maxUnit <= height) maxUnit = height;
    }

    let l = 0;
    let h = maxUnit + 1;
    while (l <= h) {
      const m = l + Math.floor((h - l) / 2);
      let sum = 0; // Use long to avoid integer overflow


      // Calculate the total wood units for the current height 'm'
      for (const height of trees) {
        sum += Math.max(0, height - m);
      }

      // Check if the total wood units match the required wood units
      if (sum >= unit) {
        minUnit = sum;
        minIndex = m; // Save the result
        l = m + 1; // Move to the right to find the minimum index
      } else {
        h = m - 1;
      }
    }
    return minIndex;
  }
  static trap(height: number[]): number {
    const n = height.length;
    if (n === 0) return 0;

    const leftMax = new Array(n).fill(0);
    const rightMax = new Array(n).fill(0);

    leftMax[0] = height[0];
    for (let i = 1; i < n; i++) {
      leftMax[i] = Math.max(leftMax[i - 1], height[i]);
    }

    rightMax[n - 1] = height[n - 1];
    for (let i = n - 2; i >= 0; i--) {
      rightMax[i] = Math.max(rightMax[i + 1], height[i]);
    }

    let waterTrapped = 0;
    for (let i = 0; i < n; i++) {
      waterTrapped += Math.min(leftMax[i], rightMax[i]) - height[i];
    }

    return waterTrapped;
  }


}
