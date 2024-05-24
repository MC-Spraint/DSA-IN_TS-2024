function reversePairs(nums: number[]): number {
  let count = 0;

  // Merge sort function
  function mergeSort(arr: number[]): number[] {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
  }

  // Merge function
  function merge(left: number[], right: number[]): number[] {
    let i = 0,
      j = 0;
    let merged = [];

    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        merged.push(left[i]);
        i++;
      } else {
        merged.push(left[j]);
        j++;
      }
    }
    while (i < left.length) {
      merged.push(left[i]);
      i++;
    }
    while (j < left.length) {
      merged.push(left[j]);
      j++;
    }

    return mergeSortedArrays(left, right);
  }

  // Merge sorted arrays
  function mergeSortedArrays(arr1: number[], arr2: number[]): number[] {
    const merged: number[] = [];
    let i = 0,
      j = 0;

    while (i < arr1.length && j < arr2.length) {
      if (arr1[i] < arr2[j]) {
        merged.push(arr1[i]);
        i++;
      } else {
        merged.push(arr2[j]);
        j++;
      }
    }

    return merged.concat(arr1.slice(i)).concat(arr2.slice(j));
  }

  // Apply merge sort
  mergeSort(nums);

  return count;
}
