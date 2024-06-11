/**
 * return rnd int between n1 and n2
 * n1 or n2 included
 * rndInt(1,3) -> possible 1,2,3
 *
 */
export function rndInt(n1: number, n2: number) {
  return Math.floor(n1 + Math.random() * (n2 - n1 + 1));
}
