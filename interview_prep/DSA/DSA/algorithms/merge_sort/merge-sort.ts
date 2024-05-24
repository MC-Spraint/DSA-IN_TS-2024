import { ListNode } from "../../linked-lists/list-node";
import { LinkedList } from "../../linked-lists/list";
function merge2(
  h1: ListNode<number> | null,
  h2: ListNode<number> | null
): LinkedList<number> {
  const new_list = new LinkedList<number>();

  if (!h1) {
    new_list.head = h2;
    return new_list;
  }
  if (!h2) {
    new_list.head = h1;
    return new_list;
  }

  if (h1.data as number < (h2.data as number)) {
    new_list.head = h1;
    new_list.head.next = merge2(h1.next, h2).head;
  } else {
    new_list.head = h2;
    new_list.head.next = merge2(h1, h2.next).head;
  }

  return new_list;
}

function mergeSort(head: ListNode<number> | null): LinkedList<number> {
    if (!head || !head.next) {
        const result = new LinkedList<number>();
        result.head = head;
        return result;
    }

    let slow: ListNode<number> | null = head;
    let fast: ListNode<number> | null = head.next;

    // Find the midpoint of the list
    while (fast !== null && fast.next !== null) {
        slow = slow! .next;
        fast = fast.next.next;
    }

    // If slow is null, it means the list has only one element
    if (slow === null) {
        const result = new LinkedList<number>();
        result.head = head;
        return result;
    }

    // Split the list into two halves
    const second_half: ListNode<number> | null = slow.next;
    slow.next = null;

    // Recursively sort each half
    const first_half = mergeSort(head);
    const second_half_sorted = mergeSort(second_half);

    // Merge the sorted halves
    return merge2(first_half.head, second_half_sorted.head);
}

