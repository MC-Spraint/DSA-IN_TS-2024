export class Grids {
  static spiralTraversal(matrix: number[][]): number[] {
    if (matrix.length === 0 || matrix[0].length === 0) return [];

    const result: number[] = [];
    let top = 0,
      bottom = matrix.length - 1,
      left = 0,
      right = matrix[0].length - 1;

    while (top <= bottom && left <= right) {
      for (let i = left; i <= right; i++) result.push(matrix[top][i]);
      top++;

      for (let i = top; i <= bottom; i++) result.push(matrix[i][right]);
      right--;

      if (top <= bottom) {
        for (let i = right; i >= left; i--) result.push(matrix[bottom][i]);
        bottom--;
      }

      if (left <= right) {
        for (let i = bottom; i >= top; i--) result.push(matrix[i][left]);
        left++;
      }
    }

    return result;
  }

  static isValidSudoku(board: string[][]): boolean {
    const rows = new Map<number, Set<string>>();
    const cols = new Map<number, Set<string>>();
    const squares = new Map<string, Set<string>>();

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const cellValue = board[r][c];
        if (cellValue === ".") continue;

        // Initialize
        const squareKey = Math.floor(r / 3) + "-" + Math.floor(c / 3);
        if (!rows.has(r)) rows.set(r, new Set<string>());
        if (!cols.has(c)) cols.set(c, new Set<string>());
        if (!squares.has(squareKey)) squares.set(squareKey, new Set<string>());

        if (
          rows.get(r)!.has(cellValue) ||
          cols.get(c)!.has(cellValue) ||
          squares.get(squareKey)!.has(cellValue)
        )
          return false;

        rows.get(r)!.add(cellValue);
        cols.get(c)!.add(cellValue);
        squares.get(squareKey)!.add(cellValue);
      }
    }
    return true;
  }
  static rotate(matrix: number[][]): void {
    const n = matrix.length;

    for (let row = 0; row < n; row++) {
      for (let col = row + 1; col < n; col++) {
        [matrix[row][col], matrix[col][row]] = [
          matrix[col][row],
          matrix[row][col],
        ];
      }
    }

    for (let row = 0; row < n; row++) {
      matrix[row].reverse();
    }
  }
  static getMapOfAllArrays(m: number[][]): Map<number, number[]> {
    const result: Map<number, number[]> = new Map();
    const startIndex = 0;

    let sumRow: number[] = new Array(m[startIndex].length).fill(0);

    m.slice(startIndex).forEach((row, index) => {
      row.forEach((value, i) => (sumRow[i] += value));
      result.set(startIndex + index, [...sumRow]);
    });

    return result;
  }
  static maxArea(height: number[]): number {
    let left = 0;
    let right = height.length - 1;
    let maxArea = 0;

    while (left < right) {
      const area = Math.min(height[left], height[right]) * (right - left);
      maxArea = Math.max(maxArea, area);
      if (height[left] < height[right]) {
        left++;
      } else {
        right--;
      }
    }

    return maxArea;
  }
}
