export function decorator1<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    _offset = 3;
  };
}
export function decorator2(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor
) {
  //TODO:
  //TODO:
  //TODO:
}
export function decorator3(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor
) {
  //TODO:
  //TODO:
  //TODO:
}

export function decorator4<T extends {}>(constructor: T) {
  if ('forbiddenSymbols' in constructor) {
    const originalSymbols = (constructor as any).forbiddenSymbols;
    (constructor as any).forbiddenSymbols = [...originalSymbols, '"', "'"];
  }
}
