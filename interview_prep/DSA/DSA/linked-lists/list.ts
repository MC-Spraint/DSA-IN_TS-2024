import { ListNode } from "./list-node";

export class LinkedList<T> {
  public head: ListNode<T> | null;
  private length: number;
  private tail: ListNode<T> | null;
  private n: ListNode<T> | null;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
    this.n = null;
  }
  getHead(): ListNode<T> | null {
    const head = this.head;
    return head;
  }

  getLength(): number {
    let count = 0;
    let temp: ListNode<T> | null = this.head;
    while (temp != null) {
      temp = temp.next;
      count++;
    }
    return count;
  }
  addAtIndex(i: number, value: T): void {
    if (0 > i) {
      throw new Error("Index can't be negative");
    }
    const new_node = new ListNode<T>(value);
    if (i === 0) {
      new_node.next = this.head;
      this.head = new_node;
      this.length++;
      return;
    }
    let temp: ListNode<T> | null = this.head;
    let count = 0;
    while (temp !== null) {
      if (count === i - 1) {
        new_node.next = temp.next;
        temp.next = new_node;
        this.length++;
        return;
      }
      temp = temp.next;
      count++;
    }
    throw new Error("Index out of bound");
  }

  remove(i: number): ListNode<T> | null {
    if (0 > i) {
      throw new Error("Index can't be negative");
    }
    if (!this.head) throw new Error("Empty list");
    let temp: ListNode<T> | null = this.head;
    if (i == 0) {
      temp = this.head;
      this.head = this.length === 1 ? null : this.head.next;
      this.length--;
      return temp;
    }

    let count = 0;
    while (temp.next !== null) {
      if (count === i - 1) {
        const toDelete = temp.next;
        temp.next = temp.next.next;
        this.length--;
        return toDelete;
      }
      temp = temp.next;
      count++;
    }
    throw new Error("Index out of bound");
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

  print2(): Record<string, string | number> {
    const result: Record<string, string | number> = {};

    if (!this.head) {
        result["LinkedList"] = "NULL";
        result["Head"] = "NULL";
        result["Tail"] = "NULL";
        result["Length"] = 0;
        return result;
    }

    let temp = this.head;
    let str = "";
    while (temp!.next !== null) {
        str += temp!.data + " -> ";
        temp = temp!.next;
    }
    str += temp!.data + " -> NULL";

    result["LinkedList"] = str;
    result["Head"] = this.head!.data as unknown as string;
    result["Tail"] = temp!.data as unknown as string;
    result["Length"] = this.length;
    
    return result;
}

}

// Main function
export const linkedListMain = (): void => {
  const list = new LinkedList();

  // Insert some elements into the linked list
  list.addAtIndex(0, 1);
  list.addAtIndex(0, 3);
  list.addAtIndex(0, 5);
  list.addAtIndex(0, 6);
  list.addAtIndex(0, 10);
  // list.remove(0);
  // list.remove(0);
  // list.remove(0);
  // list.remove(1);
  // list.remove(0);

  // Reverse the linked list
  list.reverse();

  // Print the linked list
  // list.print();
  console.log(list.print2());

  // Uncomment the following lines to test additional functionalities
  // list.deleteAt(4);
  // list.addCycle(3);
  // console.log(list.hasCycle());
};
