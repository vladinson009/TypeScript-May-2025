type FunctionKeys<T> = {
  [Key in keyof T]: T[Key] extends Function ? Key : never;
}[keyof T];

type AllFunctions<U> = Pick<U, FunctionKeys<U>>;

type test = {
  name: string;
  age: number;
  test: () => string;
};
type extracted = AllFunctions<test>;
