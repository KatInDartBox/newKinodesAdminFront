import { rndInt } from "../array/rnd";
import { ASCI_AND_SPECIAL } from "../constance";

export function getRndPwd(len: number, pull?: string): string {
  if (!pull) pull = ASCI_AND_SPECIAL;
  const pLen = pull.length - 1;

  let r = "";
  for (let i = 0; i < len; i++) {
    const n = rndInt(0, pLen);
    r = r + (pull[n] || "");
  }
  return r;
}
