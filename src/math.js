/**
  * @param {number} n
  */
export function isAlmostZero(n, tolerance = Number.EPSILON) {
  return Math.abs(n) <= tolerance;
}

/** 
  * @param {number} a
  * @param {number} b
  */
export function absMax(a, b) {
  const absA = Math.abs(a);
  const absB = Math.abs(b);
  const maxSign = absA > absB ? Math.sign(a) : Math.sign(b);
  return Math.max(absA, absB) * maxSign;
}

/**
  * @param {number} radians
  * @returns {number}
  */
export function rad2deg (radians) {
  const deg = radians * (180 / Math.PI);
  if(deg < 0) {
    return deg + 360;
  } else {
    return deg;
  }
}

