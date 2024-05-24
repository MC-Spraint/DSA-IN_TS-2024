export class StacksHard {
  //1
  public nearestSmallerToRight(nums: number[]): number[] {
    const stack: number[] = [];
    const result: number[] = [];

    for (let i = nums.length - 1; i >= 0; i--) {
      while (stack.length && nums[i] <= stack[stack.length - 1]) stack.pop();
      if (!stack.length) result.unshift(-1);
      else result.unshift(stack[stack.length - 1]);
      // result[i] = !stack.length ? -1 : stack[stack.length - 1]
      stack.push(nums[i]);
    }
    return result;
  }

  //2
  public nearestSmallerToLeft(nums: number[]): number[] {
    const result: number[] = [];
    const stack: number[] = [];

    for (let i = 0; i < nums.length; i++) {
      while (stack.length && nums[i] <= stack[stack.length - 1]) stack.pop();
      if (stack.length === 0) result.push(-1);
      else result.push(stack[stack.length - 1]);
      // result[i] = !stack.length ? -1 : stack[stack.length - 1]
      stack.push(nums[i]);
    }

    return result;
  }

  //3
  public nearestGreaterToRight(nums: number[]): number[] {
    const result: number[] = [];
    const stack: number[] = [];

    for (let i = nums.length - 1; i >= 0; i--) {
      while (stack.length && nums[i] >= stack[stack.length - 1]) stack.pop();
      if (stack.length === 0) result.unshift(-1);
      else result.unshift(stack[stack.length - 1]);
      // result[i] = !stack.length ? -1 : stack[stack.length - 1]
      stack.push(nums[i]);
    }

    return result;
  }

  //4
  public nearestGreaterToLeft(nums: number[]): number[] {
    const result: number[] = [];
    const stack: number[] = [];

    for (let i = 0; i < nums.length; i++) {
      while (stack.length && nums[i] >= stack[stack.length - 1]) stack.pop();
      if (stack.length === 0) result.push(-1);
      else result.push(stack[stack.length - 1]);
      // result[i] = !stack.length ? -1 : stack[stack.length - 1]
      stack.push(nums[i]);
    }
    return result;
  }

  //5
  public stockSpan(arr: number[]): number[] {
    const stack: number[] = [];
    const span: number[] = [];

    for (let i = 0; i < arr.length; i++) {
      while (stack.length && arr[i] >= arr[stack[stack.length - 1]])
        stack.pop();
      // span[i] = !stack.length ? i - (-1) : i - stack[stack.length - 1];
      if (!stack.length) span.push(i - -1);
      else span.push(i - stack[stack.length - 1]);
      stack.push(i);
    }
    return span;
  }

  //6
  public maxHistogramArea(heights: number[]): number {
    const nearestSmallerRight: number[] = this.nearestSmallerToRight(heights);
    const nearestSmallerLeft: number[] = this.nearestSmallerToLeft(heights);
    let maxArea = 0;

    for (let i = 0; i < heights.length; i++) {
      const width = nearestSmallerRight[i] - nearestSmallerLeft[i] - 2;
      const area: number = width * heights[i];
      maxArea = Math.max(maxArea, area);
    }

    return maxArea;
  }
  //7
  public trappingRainWater(a: number[]): number {
    const stack: number[] = [];
    let result = 0;

    for (let i = 0; i < a.length; i++) {
      while (stack.length > 0 && a[i] > a[stack[stack.length - 1]]) {
        const top = stack.pop()!;
        if (stack.length === 0) break;

        const distance = i - stack[stack.length - 1] - 1;
        const boundedHeight =
          Math.min(a[i], a[stack[stack.length - 1]]) - a[top];
        result += distance * boundedHeight;
      }
      stack.push(i);
    }

    return result;
  }
}
const stack = new StacksHard()
console.log(stack.stockSpan([2, 4, 3, 1, 5, 2]));
