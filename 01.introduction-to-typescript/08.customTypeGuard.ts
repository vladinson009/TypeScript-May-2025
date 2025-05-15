function isNonEmptyStringArray(arr: unknown): arr is number[] {
  return (
    Array.isArray(arr) &&
    arr.length > 0 &&
    arr.every((item) => typeof item === 'string')
  );
}
console.log(isNonEmptyStringArray({}));
console.log(isNonEmptyStringArray({ test: 'one' }));
console.log(isNonEmptyStringArray([]));
console.log(isNonEmptyStringArray(undefined));
console.log(isNonEmptyStringArray(null));
console.log(isNonEmptyStringArray([12, 13]));
console.log(isNonEmptyStringArray(['test', 123]));
console.log(isNonEmptyStringArray(['a', 'b', 'c']));
