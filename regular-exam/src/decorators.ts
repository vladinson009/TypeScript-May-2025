export function decorator1<T extends new (...args: any[]) => {}>(constructor: T) {}

export function decorator2(
  target: object,
  methodName: string,
  descriptor: PropertyDescriptor
) {
  const originalGetter = descriptor.get;
  descriptor.get = function () {
    return originalGetter?.call(this) * 1.2;
  };
}
export function decorator3(
  target: object,
  methodName: string,
  descriptor: PropertyDescriptor
) {
  const originalGetter = descriptor.get;
  descriptor.get = function () {
    return originalGetter?.call(this) * 1.2;
  };
}
export function decorator4(target: object, propKey: string, paramIndex: number) {}

export function decorator5<T extends abstract new (...args: any[]) => {}>(
  constructor: T
) {
  abstract class ExtendedClass extends constructor {
    public static readonly MotelName = 'Monthly Motel';
  }
  return ExtendedClass;
}
