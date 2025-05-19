type InputType = string | number | undefined;

function optionalMultiplier(
  first?: InputType,
  second?: InputType,
  third?: InputType
): number {
  let sum: number = 1;
  for (const num of [first, second, third]) {
    if (typeof num == 'string' || typeof num == 'number') {
      sum *= Number(num);
    }
  }
  return sum;
}
console.log(optionalMultiplier());
