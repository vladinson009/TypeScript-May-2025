function ageDecorator(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalDescriptor = descriptor.set;

  descriptor.set = function (value: number) {
    const minValue = 1;
    const maxValue = 200;
    if (value < minValue || value > maxValue || !value) {
      throw new Error(`Age must be between ${minValue} and ${maxValue}`);
    }
    return originalDescriptor?.call(this, value);
  };
}

class Age {
  private _age!: number;
  constructor(age: number) {
    this.age = age;
  }
  @ageDecorator
  set age(val: number) {
    this._age = val;
  }
  get age() {
    return this._age;
  }
}
let ageVal = new Age(10);
ageVal.age = -10;
