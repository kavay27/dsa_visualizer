export function createRandomArray(size) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 92) + 8);
}

export function clampNumber(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
