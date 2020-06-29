class Node<T> {
  value: T;
  previous: Node<T> | null;
  next: Node<T> | null;

  constructor(value: T) {
    this.value = value;
    this.previous = null;
    this.next = null;
  }
}

class DoublyLinkedList<T> {
  head: Node<T> | null;
  tail: Node<T> | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(value: T) {
    const node = new Node(value);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      (this.tail as Node<T>).next = node;
      node.previous = this.tail;
      this.tail = node;
    }
    this.length++;
    return this;
  }

  pop() {
    if (!this.tail) {
      return false;
    }

    const popped = this.tail;

    const newTail = this.tail.previous;

    if (newTail) {
      newTail.next = null;
      this.tail.previous = null;
    } else {
      this.head = null;
    }

    this.tail = newTail;
    this.length--;

    return popped;
  }
}

export { DoublyLinkedList, Node };
