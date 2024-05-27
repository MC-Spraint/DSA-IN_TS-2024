function snakeTraversal(matrix: number[][]): void {
  for (let row = 0; row < matrix.length; row++) {
    if (row % 2 === 0) {
      // Traverse left to right for even rows
      for (let col = 0; col < matrix[0].length; col++) {
        console.log(matrix[row][col]);
      }
    } else {
      // Traverse right to left for odd rows
      for (let col = matrix[0].length - 1; col >= 0; col--) {
        console.log(matrix[row][col]);
      }
    }
  }
}

// Example usage
const matrix1 = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
];

console.log("Snake Traversal:");
snakeTraversal(matrix1);
function boundaryTraversal(matrix: number[][]): void {
  const rows = matrix.length;
  const cols = matrix[0].length;

  if (rows === 0 || cols === 0) return;

  console.log("Boundary Traversal:");

  // Top row
  for (let col = 0; col < cols; col++) {
    console.log(matrix[0][col]);
  }

  // Right column
  for (let row = 1; row < rows; row++) {
    console.log(matrix[row][cols - 1]);
  }

  // Bottom row
  if (rows > 1) {
    for (let col = cols - 2; col >= 0; col--) {
      console.log(matrix[rows - 1][col]);
    }
  }

  // Left column
  if (cols > 1) {
    for (let row = rows - 2; row > 0; row--) {
      console.log(matrix[row][0]);
    }
  }
}

// Example usage
const matrix2 = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
];

console.log("Boundary Traversal:");
boundaryTraversal(matrix2);

function waveTraversal(matrix: number[][]): void {
  console.log("Wave Traversal:");
  for (let col = 0; col < matrix[0].length; col++) {
    if (col % 2 === 0) {
      // Traverse top to bottom for even columns
      for (let row = 0; row < matrix.length; row++) {
        console.log(matrix[row][col]);
      }
    } else {
      // Traverse bottom to top for odd columns
      for (let row = matrix.length - 1; row >= 0; row--) {
        console.log(matrix[row][col]);
      }
    }
  }
}

// Example usage
const matrix3 = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
];

console.log("Wave Traversal:");
waveTraversal(matrix3);

function randomAccessTraversal(matrix: number[][]): void {
  const positions = [
    [0, 0],
    [1, 1],
    [2, 2],
    [3, 3],
    [0, 3],
    [3, 0],
    [1, 2],
    [2, 1],
  ];

  console.log("Random Access Traversal:");
  for (const [row, col] of positions) {
    if (row < matrix.length && col < matrix[0].length) {
      console.log(`Position: (${row}, ${col}), Value: ${matrix[row][col]}`);
    }
  }
}

// Example usage
const matrix4 = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
];

console.log("Random Access Traversal:");
randomAccessTraversal(matrix4);

function hilbertTraversal(matrix: number[][]): void {
  console.log("Simplified Hilbert-like Traversal:");
  hilbertHelper(matrix, 0, 0, matrix.length, 0, 1);
}

function hilbertHelper(
  matrix: number[][],
  x: number,
  y: number,
  size: number,
  dx: number,
  dy: number
): void {
  if (size === 1) {
    if (x < matrix.length && y < matrix[0].length) {
      console.log(`Position: (${x}, ${y}), Value: ${matrix[x][y]}`);
    }
    return;
  }

  size /= 2;
  hilbertHelper(matrix, x, y, size, dy, dx);
  hilbertHelper(matrix, x + dx * size, y + dy * size, size, dx, dy);
  hilbertHelper(
    matrix,
    x + dx * size + dy * size,
    y + dy * size + dx * size,
    size,
    dx,
    dy
  );
  hilbertHelper(matrix, x + dx * size * 2, y + dy * size * 2, size, -dy, -dx);
}

// Example usage
const matrix5 = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
];

console.log("Hilbert-like Traversal:");
hilbertTraversal(matrix5);

function zigzagTraversal(matrix: number[][]): number[] {
  // Check for empty matrix
  if (matrix.length === 0 || matrix[0].length === 0) {
    return [];
  }

  // Initialize the maximum row and column indices
  const rows = matrix.length;
  const cols = matrix[0].length;

  // Initialize result array to store the traversal order
  const result: number[] = [];

  // Start position at the top-left corner of the matrix
  let row = 0,
    col = 0;

  // Flag to track the direction of movement
  let goingDown = true;

  // Loop until we traverse the entire matrix
  while (row < rows && col < cols) {
    // Add the current element to the result
    result.push(matrix[row][col]);

    // If moving downwards diagonally
    if (goingDown) {
      // Check if we need to change direction
      if (col === 0 || row === rows - 1) {
        goingDown = false; // Change direction to upwards
        if (row === rows - 1) {
          col++; // Move right if at the last row
        } else {
          row++; // Move down if at the first column
        }
      } else {
        // Move down diagonally
        row++;
        col--;
      }
    } else {
      // If moving upwards diagonally
      if (row === 0 || col === cols - 1) {
        goingDown = true; // Change direction to downwards
        if (col === cols - 1) {
          row++; // Move down if at the last column
        } else {
          col++; // Move right if at the first row
        }
      } else {
        // Move up diagonally
        row--;
        col++;
      }
    }
  }

  return result;
}

function spiralTraversal(matrix: number[][]): number[] {
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
