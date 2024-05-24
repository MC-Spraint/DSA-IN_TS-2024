
export class ListNode<T> {
    data: T | null;
    next: ListNode<T> | null;
    prev: ListNode<T> | null;
    constructor(data?: T, next?: ListNode<T>, prev?: ListNode<T>) {
      this.data = data || null;
      this.next = next || null;
      this.prev = prev || null;
    }
  }
  