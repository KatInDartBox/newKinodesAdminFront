export function isDate(val: any) {
  return !isNaN(val) && val instanceof Date;
}
