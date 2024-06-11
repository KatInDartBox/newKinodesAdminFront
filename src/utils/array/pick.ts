import { rndInt } from "./rnd";

export function pickRnd<T>(arr: T[]): T {
  const len = arr.length - 1;
  const i = rndInt(0, len);
  return arr[i];
}
