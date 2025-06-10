export function decorator1<T extends new (...arg: any[]) => {}>(constructor: T) {
  return class extends constructor {
    protected _offset = 3;
  };
}
export function decorator2(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor
) {}
export function decorator3(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor
) {}
export function decorator4<
  T extends (abstract new (...args: any[]) => {}) & { forbiddenSymbols: string[] }
>(constructor: T) {
  const originalSymbols = constructor.forbiddenSymbols;
  constructor.forbiddenSymbols = [...originalSymbols, '"', "'"];
}
