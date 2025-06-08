type InputParamType<T> = T extends number ? number : string;

function conditionalNumber<T>(input: InputParamType<T>) {
  console.log(input);
}

conditionalNumber<number>(20.3555);
conditionalNumber<string>('wow');
conditionalNumber<boolean>('a string');

// conditionalNumber<boolean>(30);
// conditionalNumber<number>('test');
