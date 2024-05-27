function moveRight(startRow: number, startCol: number, matrix: number[][]): void {
    let col = startCol;
    const row = startRow;
    console.log('Right Movement:');
    while (col < matrix[0].length) {
        console.log(`Position: (${row}, ${col}), Value: ${matrix[row][col]}`);
        col++;
    }
    console.log('');
}

function moveDown(startRow: number, startCol: number, matrix: number[][]): void {
    let row = startRow;
    const col = startCol;
    console.log('Downward Movement:');
    while (row < matrix.length) {
        console.log(`Position: (${row}, ${col}), Value: ${matrix[row][col]}`);
        row++;
    }
    console.log('');
}
function moveLeft(startRow: number, startCol: number, matrix: number[][]): void {
    let col = startCol;
    const row = startRow;
    console.log('Left Movement:');
    while (col >= 0) {
        console.log(`Position: (${row}, ${col}), Value: ${matrix[row][col]}`);
        col--;
    }
    console.log('');
}

function moveUp(startRow: number, startCol: number, matrix: number[][]): void {
    let row = startRow;
    const col = startCol;
    console.log('Upward Movement:');
    while (row >= 0) {
        console.log(`Position: (${row}, ${col}), Value: ${matrix[row][col]}`);
        row--;
    }
    console.log('');
}

function moveUpRight(startRow: number, startCol: number, matrix: number[][]): void {
    let row = startRow;
    let col = startCol;
    console.log('Up-Right Movement:');
    while (row >= 0 && col < matrix[0].length) {
        console.log(`Position: (${row}, ${col}), Value: ${matrix[row][col]}`);
        row--;
        col++;
    }
    console.log('');
}
function moveDownRight(startRow: number, startCol: number, matrix: number[][]): void {
    let row = startRow;
    let col = startCol;
    console.log('Down-Right Movement:');
    while (row < matrix.length && col < matrix[0].length) {
        console.log(`Position: (${row}, ${col}), Value: ${matrix[row][col]}`);
        row++;
        col++;
    }
    console.log('');
}
function moveDownLeft(startRow: number, startCol: number, matrix: number[][]): void {
    let row = startRow;
    let col = startCol;
    console.log('Down-Left Movement:');
    while (row < matrix.length && col >= 0) {
        console.log(`Position: (${row}, ${col}), Value: ${matrix[row][col]}`);
        row++;
        col--;
    }
    console.log('');
}
function moveUpLeft(startRow: number, startCol: number, matrix: number[][]): void {
    let row = startRow;
    let col = startCol;
    console.log('Up-Left Movement:');
    while (row >= 0 && col >= 0) {
        console.log(`Position: (${row}, ${col}), Value: ${matrix[row][col]}`);
        row--;
        col--;
    }
    console.log('');
}






// Example usage
const matrix = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
];

moveRight(1, 1, matrix);   // Starts at position (1, 1) and moves forward
moveDown(0, 2, matrix);  // Starts at position (0, 2) and moves downward
moveLeft(3, 3, matrix);  // Starts at position (1, 3) and moves backward
moveUp(3, 2, matrix);    // Starts at position (3, 2) and moves upward

moveUpLeft(2, 2, matrix);    // Starts at position (2, 2) and moves up-left
moveUpRight(2, 1, matrix);   // Starts at position (2, 1) and moves up-right
moveDownLeft(1, 2, matrix);  // Starts at position (1, 2) and moves down-left
moveDownRight(1, 1, matrix); // Starts at position (1, 1) and moves down-right