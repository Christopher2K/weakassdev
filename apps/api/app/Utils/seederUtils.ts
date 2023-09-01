export function generateRandomNumber({ min, max }: { min: number; max: number }) {
  return Math.floor(Math.random() * max - min) + min;
}

export function getUniqueRandomItemsFromArray<T>({ items, count }: { items: T[]; count: number }) {
  if (count > items.length) throw new Error("Cannot pick more items than what's in the array");
  let randomItems: T[] = [];
  let pickedIndexes: number[] = [];

  while (randomItems.length < count) {
    const index = generateRandomNumber({ min: 0, max: items.length - 1 });
    if (!pickedIndexes.includes(index)) {
      pickedIndexes.push(index);
      randomItems.push(items[index]);
    }
  }

  return randomItems;
}
