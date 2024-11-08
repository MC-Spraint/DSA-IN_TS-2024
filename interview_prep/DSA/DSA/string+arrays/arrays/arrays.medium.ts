// //Map Function
// function map(arr: number[], fn: (n: number, i: number) => number): number[] {
//   return mapHelper(arr, fn);
// }

// function mapHelper<E, T>(
//   arr: E[],
//   condition: (element: E, index: number) => T
// ): T[] {
//   if (arr.length === 0) return [];
//   const [head, ...tail] = arr;
//   function newCondition(e: E, i: number): T {
//     return condition(e, i + 1);
//   }
//   return [condition(head, 0), ...mapHelper(tail, newCondition)];
// }

// //Filter Function
// function filter(arr: number[], fn: (n: number, i: number) => any): number[] {
//   return filterHelper(arr, (element, index) => fn(element, index));
// }

// function filterHelper<E>(
//   arr: E[],
//   condition: (element: E, index: number) => boolean
// ): E[] {
//   if (arr.length === 0) return [];
//   const [head, ...tail] = arr;
//   function newCondition(e: E, i: number): boolean {
//     return condition(e, i + 1);
//   }
//   if (condition(head, 0)) {
//     return [head, ...filterHelper(tail, newCondition)];
//   } else {
//     return filterHelper(tail, newCondition);
//   }
// }

// //Reduce Function

// function reduce(
//   nums: number[],
//   fn: (accum: number, curr: number) => number,
//   init: number
// ): number {
//   return reduceHelper(nums, fn, init);
// }

// function reduceHelper<E, T>(
//   arr: E[],
//   condition: (accum: T, curr: E, index: number) => T,
//   accum: T
// ): T {
//   if (arr.length === 0) return accum;
//   const [head, ...tail] = arr;
//   function newCondition(acc: T, curr: E, i: number): T {
//     return condition(acc, curr, i + 1);
//   }
//   const newAccum = condition(accum, head, 0);
//   return reduceHelper(tail, newCondition, newAccum);
// }

// function some<E>(arr: E[], condition: (element: E) => boolean): boolean {
//   if (arr.length == 0) return false;
//   const [head, ...tail] = arr;
//   if (condition(head)) return true;
//   return some(tail, condition);
// }
// function every<E>(arr: E[], condition: (element: E) => boolean): boolean {
//   if (arr.length == 0) return true;
//   const [head, ...tail] = arr;
//   if (condition(head)) return every(tail, condition);
//   return false;
// }

function removeFirstOccurrence(s: string, p: string): string {
  const index = s.indexOf(p);
  if (index !== -1) {
    let result = "";
    for (let i = 0; i < s.length; i++) {
      if (i < index || i >= index + p.length) {
        result += s[i];
      }
    }
    s = result;
    return s;
  }
  return s;
}
