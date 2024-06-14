import get from "lodash/get";
import { isGreater, isLessThan } from "../number/big";

export function updateCol<T>(
  collection: T[],
  item: T,
  iterate: (itm: T) => boolean,
) {
  const i = collection.findIndex(iterate);
  if (i >= 0) {
    collection[i] = {
      ...collection[i],
      ...item,
    };
  }
  return collection;
}

export function addCol<T>(collection: T[], item: T) {
  collection.unshift(item);
  return collection;
}

export function deleteCol<T>(collection: T[], iterate: (itm: T) => boolean) {
  const i = collection.findIndex(iterate);
  if (i >= 0) {
    collection.splice(i, 1);
  }
  return collection;
}

type tSafeNumber = number | string;
export function pageCursor<T>(
  collection: T[],
  iterate: (item: T) => tSafeNumber,
  direction: "up" | "down" = "up",
) {
  return direction === "up"
    ? pageCursorUp(collection, iterate)
    : pageCursorDown(collection, iterate);
}

export function pageCursorUp<T>(
  collection: T[],
  iterate: (item: T) => tSafeNumber,
) {
  let max = iterate(collection[0]);

  const cols = collection.slice(1);

  cols.forEach((col) => {
    const itm = iterate(col);
    if (isGreater(itm, max, 8, true)) {
      max = itm;
    }
  });
  return max;
}

export function pageCursorDown<T>(
  collection: T[],
  iterate: (item: T) => tSafeNumber,
) {
  let min = iterate(collection[0]);
  const cols = collection.slice(1);
  cols.forEach((col) => {
    const itm = iterate(col);
    if (isLessThan(itm, min, 8, true)) {
      min = itm;
    }
  });
  return min;

  // let min = Big(Infinity);
  // collection.forEach((col) => {
  //   const itm = Big(iterate(col));
  //   if (itm.lt(min)) {
  //     min = itm;
  //   }
  // });
  // return min;
}

export function getMultiValues<T extends Object>(
  obj: T,
  pathKeys: (keyof T)[],
): string[] {
  let r: string[] = [];

  pathKeys.forEach((key) => {
    const v = get(obj, key, "") + "";
    // const vStr = (`${JSON.stringify(v) || ""}`)
    r.push(v);
  });
  return r;
}
