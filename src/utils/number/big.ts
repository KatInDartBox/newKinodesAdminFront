const MaxInt = "9007199254740991";
const MaxLen = MaxInt.length;

export function isLessThan(
  a: string | number,
  b: string | number,
  decimalPadLen?: number,
  stripZero?: boolean,
) {
  return !isGreater(a, b, decimalPadLen, stripZero);
}

/**
 * @description
 * compare 2 big number, accept it as string
 *
 *
 */
export function isGreater(
  a: string | number,
  b: string | number,
  decimalPadLen?: number,
  stripZero?: boolean,
) {
  decimalPadLen = decimalPadLen || 4;
  a = a + "";
  b = b + "";

  if (a.length < MaxLen && b.length < MaxLen) {
    return +a > +b;
  }

  if (!!stripZero) {
    a = getStripLeaderZero(a);
    b = getStripLeaderZero(b);
  }
  a = serialDecimal(a, decimalPadLen);
  b = serialDecimal(b, decimalPadLen);

  if (a.length < MaxLen && b.length < MaxLen) {
    return +a > +b;
  }

  const aLen = a.length;
  const bLen = b.length;
  if (aLen > bLen) {
    return true;
  } else if (aLen < bLen) {
    return false;
  } else if (aLen === bLen) {
    //a=123456
    //b=123556
    for (let i = 0; i < aLen; i++) {
      let ai = a[i];
      let bi = b[i];
      if (ai !== bi) {
        return +ai > +bi;
      }
    }
  }

  return false;
}

function serialDecimal(a: string, len: number) {
  let arr = a.split(".");
  let int = arr[0];
  let dec = arr[1] || "";

  return int + padDecimal(dec, len);
}

export function padDecimal(a: string, len: number) {
  let r = "";
  for (let i = 0; i < len; i++) {
    let n = a[i];
    r += !!n ? n : "0";
  }
  return r;
}

function getStripLeaderZero(a: string) {
  //a=00012345
  let len = a.length;
  for (let i = 0; i < len; i++) {
    let n = a[i];
    if (n !== "0") return a.slice(i);
  }
  return "";
}
