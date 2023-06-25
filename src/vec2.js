/**
  * @typedef {{x: number, y: number}} Vec2
  */


/**
  * @param {Vec2} o
  * @param {number} maxLength
  * @returns {Vec2}
  */
export function clamp(o, maxLength) {
  const lengthSquared = getLengthSquared(o);

  // Special case: start and end points are too close
  if (lengthSquared <= maxLength * maxLength) {
    return o;
  }

  const { x: x, y: y } = o;

  if (isAlmostZero(x)) {
    // Math.abs(y) must be greater than maxLength becase we already checked for lengthSquared <= maxLength * maxLength
    o.y = maxLength * Math.sign(y);
    return o;
  }

  if (isAlmostZero(y)) {
    // Math.abs(dx) must be greater than maxLength becase we already checked for lengthSquared <= maxLength * maxLength
    o.x = maxLength * Math.sign(x);
    return o;
  }

  const length = Math.sqrt(lengthSquared);

  // Calculate the new point that is maxLength away from start in the direction of end
  o.x = (x * maxLength) / length;
  o.y = (y * maxLength) / length;
  return o;
}


/**
  * @param {Vec2} o
  * @returns number
  */
export function getLengthSquared(o) {
  return o.x * o.x + o.y * o.y;
}

/**
  * @param {number} n
  */
export function isAlmostZero(n, tolerance = Number.EPSILON) {
  return Math.abs(n) <= tolerance;
}
