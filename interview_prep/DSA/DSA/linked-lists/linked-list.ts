import { ListNode } from "./list-node";
class LinkedList<T> implements Queue<T>, Iterable<T> {
  private head: ListNode<T> | null;
  private tail: ListNode<T> | null;
  private size: number;
  private n: ListNode<T> | null;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
    this.n = null;
  }


  reverse(): ListNode<T> | null {
    let temp = this.head;
    let prv: ListNode<T> | null = null;
    let nxt: ListNode<T> | null;

    while (temp !== null) {
      nxt = temp.next;
      temp.next = prv;
      prv = temp;
      temp = nxt;
    }
    this.head = prv;
    return this.head;
  }

  addCycle(num: number): void {
    let temp = this.head;
    let c: ListNode<T> | null = null;
    while (temp !== null) {
      if (temp.data === num) {
        c = temp;
      }
      temp = temp.next;
    }
    if (c !== null) {
      temp = this.head;
      while (temp !== null && temp.next !== null) {
        temp = temp.next;
      }
      if (temp) {
        temp.next = c;
      }
    } else throw new Error("Not found!");
  }

  hasCycle(): boolean {
    if (!this.head || !this.head.next) {
      return false;
    }

    let tortoise = this.head;
    let hare = this.head;

    while (hare !== null && hare.next !== null) {
      tortoise = tortoise.next!;
      hare = hare.next.next!;

      if (tortoise === hare) {
        return true;
      }
    }
    return false;
  }

  getFirst(): T | null {
    if (!this.head) throw new Error("Empty list");
    return this.head.data;
  }

  getLast(): T | null {
    if (!this.tail) throw new Error("Empty list");
    return this.tail.data;
  }

  addFirst(data: T): void {
    const node = new ListNode<T>();
    node.data = data;
    node.next = null;
    if (this.head !== null) {
      this.n = this.head;
      node.next = this.n;
      this.head = node;
    } else {
      this.head = node;
      this.tail = node;
    }
    this.size++;
  }

  addLast(data: T): void {
    const node = new ListNode<T>();
    node.data = data;
    node.next = null;
    if (this.head === null) {
      this.head = node;
    } else {
      this.n = this.head;
      while (this.n.next !== null) this.n = this.n.next;
      this.n.next = node;
    }
    this.tail = node;
    this.size++;
  }

  addAtIndex(index: number = 0, data: T): void {
    if (index > this.size) throw new Error("Invalid index");
    const node = new ListNode<T>();
    node.data = data;
    node.next = null;
    if (index === 0) {
      if (this.head !== null) {
        this.n = this.head;
        node.next = this.n;
        this.head = node;
      } else {
        this.head = node;
        this.tail = node;
      }
    } else if (index === this.size) {
      if (this.head === null) this.head = node;
      else this.tail!.next = node;
      this.tail = node;
    } else {
      this.n = this.head;
      for (let i = 0; i < index - 1; i++) {
        if (!this.n!.next) break;
        this.n = this.n !== null ? this.n.next : null;
      }
      const temp = this.n!.next;
      this.n!.next = node;
      node.next = temp;
    }
    this.size++;
  }

  print(): void {
    if (this.head !== null) {
      this.n = this.head;
      let c = 1;
      let str = "LinkedList=";
      while (this.n!.next !== null) {
        str += this.n!.data + "-> ";
        this.n = this.n.next;
        c++;
      }
      str += this.n!.data + "-> NULL,";
      console.log(str);
      console.log("First=" + this.head.data + ",");
      console.log("Last=" + this.n!.data + ",");
      console.log("Size=" + c);
    }
  }

  printFirst(): void {
    if (!this.head) throw new Error("Empty list");
    console.log(this.head.data + "-> ");
  }

  printLast(): void {
    if (this.head !== null) {
      this.n = this.head;
      while (this.n!.next !== null) this.n = this.n.next;
      console.log(this.n!.data + "-> ");
      console.log();
    }
  }

  add(element: T): boolean {
    this.addFirst(element);
    return true;
  }

  remove(): T | null {
    if (!this.head) throw new Error("Empty list");
    const elem = this.tail!.data;
    this.n = this.head;
    for (let i = 0; i < this.size - 2; i++) {
      if (!this.n!.next) break;
      this.n = this.n.next;
    }
    this.n!.next = null;
    this.tail = this.n;
    this.size--;
    return elem;
  }

  offer(element: T): boolean {
    this.addFirst(element);
    return true;
  }
  poll(): T | null {
    if (!this.head) return null;
    const elem = this.tail!.data;
    this.n = this.head;
    for (let i = 0; i < this.size - 2; i++) {
      if (!this.n!.next) break;
      this.n = this.n.next;
    }
    this.n!.next = null;
    this.tail = this.n;
    this.size--;
    return elem;
  }

  peek(): T | null {
    return null;
  }

  isEmpty(): boolean {
    return false;
  }

  [Symbol.iterator](): Iterator<T> {
    return new LinkedListIterator<T>(this.head);
  }
}

class LinkedListIterator<T> implements Iterator<T> {
  private current: ListNode<T> | null;

  constructor(head: ListNode<T> | null) {
    this.current = head;
  }

  hasNext(): boolean {
    if (this.current === null && this.current !== undefined) return true;
    return this.current!.next !== null;
  }

  next(): IteratorResult<T> {
    if (this.current === null && this.current !== undefined) {
      this.current = this.current;
      return { value: this.current!.data!, done: false };
    }
    if (this.current !== null) {
      const elem = this.current!.next!.data;
      this.current = this.current!.next;
      return { value: elem!, done: false };
    }
    return { value: undefined as any, done: true };
  }
}
