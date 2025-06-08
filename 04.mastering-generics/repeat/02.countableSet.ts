interface CountableSet<T> {
  add(item: T): void;
  remove(item: T): void;
  contains(item: T): boolean;
  getNumberOfCopies(item: T): number;
}

class CountedSet<T> implements CountableSet<T> {
  private collection: Map<T, number> = new Map();

  add(item: T) {
    const collectionCount = this.collection.get(item);
    if (collectionCount === undefined) {
      this.collection.set(item, 1);
    } else {
      this.collection.set(item, collectionCount + 1);
    }
  }
  remove(item: T) {
    const collectionCount = this.collection.get(item);
    if (collectionCount) {
      this.collection.set(item, collectionCount - 1);
    }
  }
  contains(item: T): boolean {
    return !!this.collection.get(item);
  }
  getNumberOfCopies(item: T): number {
    const collectionCount = this.collection.get(item);
    return collectionCount ?? 0;
  }
}

let codesCounterSet = new CountedSet<200 | 301 | 404 | 500>();
codesCounterSet.add(404);
codesCounterSet.add(200);
console.log(codesCounterSet.contains(404));
console.log(codesCounterSet.getNumberOfCopies(200));

// codesCounterSet.add(205); //TS Error
// codesCounterSet.getNumberOfCopies(350); //TS Error
