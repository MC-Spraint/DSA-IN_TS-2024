// Iterator interface
interface Iterator<T> {
    hasNext(): boolean;
    next(): IteratorResult<T>;
  }

  
  // Aggregate interface
  interface Aggregate<T> {
    createIterator(): Iterator<T>;
  }
  
  // Concrete Iterator
  class ArrayIterator<T> implements Iterator<T> {
    private index: number = 0;
  
    constructor(private collection: T[]) {}
  
    hasNext(): boolean {
      return this.index < this.collection.length;
    }
  
    next(): IteratorResult<T> {
      if (this.hasNext()) {
        return {
          done: false,
          value: this.collection[this.index++]
        };
      } else {
        return {
          done: true,
          value: undefined as any
        };
      }
    }
  }
  
  // Concrete Aggregate
  class ArrayCollection<T> implements Aggregate<T> {
    constructor(private collection: T[]) {}
  
    createIterator(): Iterator<T> {
      return new ArrayIterator(this.collection);
    }
  }
  
  // Usage
  const collection: number[] = [1, 2, 3, 4, 5];
  const aggregate: Aggregate<number> = new ArrayCollection(collection);
  const iterator: Iterator<number> = aggregate.createIterator();
  
  let rslt = iterator.next();
  while (!rslt.done) {
    console.log(rslt.value);
    rslt = iterator.next();
  }
  