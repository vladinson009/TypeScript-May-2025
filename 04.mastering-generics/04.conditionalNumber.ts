type InputParamType<T> = T extends number
  ? number
  : T extends string
  ? string
  : never;

function conditionalNumber<T>(input: InputParamType<T>): void {
  if (typeof input == 'number') {
    console.log(input.toFixed(2));
  } else {
    console.log(input);
  }
}

conditionalNumber<number>(20.3555);
conditionalNumber<string>('wow');
// conditionalNumber<boolean>('a string'); // TS ERROR
// conditionalNumber<boolean>(30); TS ERROR
// conditionalNumber<number>('test'); TS ERROR
