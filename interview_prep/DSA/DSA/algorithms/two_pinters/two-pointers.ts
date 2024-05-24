export class TwoPointers {
  static maxArea(height: number[]): number {
    let maxArea = 0;
    let l = 0;
    let r = height.length - 1;

    while (l < r) {
      const h = Math.min(height[l], height[r]);
      const area = h * (r - l);
      maxArea = Math.max(maxArea, area);
      if (height[l] < height[r]) {
        l++;
      } else {
        r--;
      }
      console.log(maxArea);
    }
    return maxArea;
  }
  static threeSum(nums: number[], target: number): number[][] {
    nums.sort((a, b) => a - b);
    const result: number[][] = [];
    const visitedTriplets = new Set<string>();

    for (let i = 0; i < nums.length - 2; i++) {
      let left = i + 1;
      let right = nums.length - 1;

      while (left < right) {
        const sum = nums[i] + nums[left] + nums[right];
        if (sum === target) {
          const tripletStr = `${nums[i]},${nums[left]},${nums[right]}`;
          if (!visitedTriplets.has(tripletStr)) {
            result.push([nums[i], nums[left], nums[right]]);
            visitedTriplets.add(tripletStr);
          }
          left++;
          right--;
        } else if (sum < target) left++;
        else right--;
      }
    }

    return result;
  }

  static twoSum(numbers: number[], target: number): number[] {
    const sorted = numbers.sort((a, b) => a - b);
    let left = 0;
    let right = sorted.length - 1;

    while (left < right) {
      const sum = sorted[left] + sorted[right];

      if (sum === target) return [sorted[left], sorted[right]];
      else if (sum < target) left++;
      else right--;
    }

    return [];
  }

  static isSubsequence(s: string, t: string): boolean {
    let j = 0;
    for (let i = 0; i < t.length; i++) if (s[j] == t[i]) j++;
    return j === s.length;
  }
  static isPalindrome(s: string): boolean {
    s =  s.replace(/[^a-zA-z0-9]/g, "").toLowerCase()
    let l = 0;
    let r = s.length - 1;
  
    while (l < r) {
        if (s[l] !== s[r]) return false;
        l++;
        r--;
    }
    return true;
  }
}
