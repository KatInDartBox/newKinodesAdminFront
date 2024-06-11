import DOMPurify from "dompurify";
import { looper } from "../object/looper";

export function sanitize(obj: any) {
  return looper(obj, (key, val) => ({ key, val: validate(val) }));
}

function validate(val: any) {
  if (typeof val === "string") {
    return DOMPurify.sanitize(val);
  }
  return val;
}
