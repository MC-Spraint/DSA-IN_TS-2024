function maxHistogramArea(heights: number[]): number {
    let maxArea = 0;
    const stack: number[] = [];
    const n = heights.length;

    for (let i = 0; i < n; i++) {
        while (stack.length && heights[i] <= heights[stack[stack.length - 1]]) {
            const height = heights[stack.pop()!];
            const width = stack.length ? i - stack[stack.length - 1] - 1 : i;
            maxArea = Math.max(maxArea, height * width);
        }
        stack.push(i); 
    }

    while (stack.length) {
        const height = heights[stack.pop()!];
        const width = stack.length ? n - stack[stack.length - 1] - 1 : n;
        maxArea = Math.max(maxArea, height * width);
    }

    return maxArea;
    
}
function getMapOfAllArrays(m: number[][]): Map<number, number[]> {
    const result: Map<number, number[]> = new Map();
    const startIndex = 0;

    let sumRow: number[] = new Array(m[startIndex].length).fill(0);

    m.slice(startIndex).forEach((row, index) => {
      row.forEach((value, i) => (sumRow[i] += value));
      result.set(startIndex + index, [...sumRow]);
    });

    return result;
  }
  function maxRectangleInBinaryMatrix(heights: number[]): void {
    const map = getMapOfAllArrays([[]]);
    //Do MAH for all its values
    //Find out max
  }

  //7

  //8

  //9