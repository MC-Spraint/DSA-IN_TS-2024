
function flattenArray(arr: any[]): any[] {
    if (!Array.isArray(arr)) {
        return [arr]; // Base case: if arr is not an array, return it wrapped in an array
    }

    let flattened: any[] = []; 
    arr.forEach(item => {
        flattened.push(...flattenArray(item)); // Recursively flatten nested arrays
    });

    return flattened;
}
function missingNums(arr: number[]): number[] {
    const maxNum = Math.max(...arr); // Find the maximum number in arr to determine the range
    const fullSet = new Set(Array.from({ length: maxNum }, (_, index) => index + 1));
    const presentSet = new Set(arr);
    const missingNumbers: number[] = [];

    fullSet.forEach(num => {
        if (!presentSet.has(num)) {
            missingNumbers.push(num);
        }
    });
    return missingNumbers;
}
function uniqueElements(arr: any[]): any[] {
    const duplicates = arr.filter((elem, index) => arr.indexOf(elem) !== index);
    const uniques = arr.filter((elem) => !duplicates.includes(elem));
    return uniques;
}

function commonElements(arr1: number[], arr2: number[]): number[] {
    return arr1.filter((elem) => arr2.includes(elem));
}
function hasUniqueCharacters(str: string): boolean {
    const charSet = new Set(str);
    return charSet.size === str.length;
}
function countOccurrences(str: string, char: string): number {
    return str.split(char).length - 1;
}

// Example usage:

console.log(flattenArray([1, [2, [3, [4, 5]], 6], 7, [8, 9]])); // Output: [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log('uniques', uniqueElements([1, 2, 2, 3, 4, 4, 5])); //uniques [ 1, 3, 5 ]
console.log(missingNums([2, 4, 8])); // [ 1, 3, 5, 6, 7 ]
console.log(commonElements([1, 2, 3], [3, 4, 5])); // [3]
console.log(hasUniqueCharacters("hello")); // false
console.log(countOccurrences("hello", "l")); // 2


