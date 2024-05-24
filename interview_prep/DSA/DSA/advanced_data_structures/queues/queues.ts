interface Queue<T> {
  add(element: T): boolean;
  remove(): T | null;
  offer(element: T): boolean;
  poll(): T | null;
  peek(): T | null;
  isEmpty(): boolean;
}