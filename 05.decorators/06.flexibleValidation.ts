export {};
/**
 * set Name Decorator should validate the length of the name if is at least minLength char long as a parameter from decorator factory
 * set Age Decorator should validate if age is between min-max where min and max are parameters of dec factory
 * set Password Decorator should validate if password matched a given regex  where the regex is aparam of dec factory
 */

/**
 * 1. Create 3 separated dec factory wrappers;
 * 2. return dec function with target, propName and descriptor
 * 3. save original setter
 * 4. modify the original setter with new function with statement condition
 * 5. call original setter with context and value
 * 6. return descriptor
 * 7. validiateName, validateAge, validatePassword
 * 8. test
 */

function validateNameDecorator(minLength: number) {
  return function (
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor
  ) {
    const originalDescriptor = descriptor.set;

    descriptor.set = function (value: string) {
      if (value.length < minLength) {
        throw new Error('name must have a min length of 3 characters');
      }
      originalDescriptor?.call(this, value);
    };
    return descriptor;
  };
}
function validateAgeDecorator(min: number, max: number) {
  return function (
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor
  ) {
    const originalSetter = descriptor.set;
    descriptor.set = function (value: number) {
      if (value < min || value > max) {
        throw new Error('age must be between 1 and 100');
      }
      originalSetter?.call(this, value);
    };
    return descriptor;
  };
}
function validatePasswordDecorator(pattern: RegExp) {
  return function (
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor
  ) {
    const originalSetter = descriptor.set;

    descriptor.set = function (value: string) {
      if (!pattern.test(value)) {
        const error = `password needs to match ${pattern}`;
        throw new Error(error);
      }
      originalSetter?.call(this, value);
    };
    return descriptor;
  };
}
class User {
  private _name!: string;
  private _age!: number;
  private _password!: string;

  constructor(name: string, age: number, password: string) {
    this.name = name;
    this.age = age;
    this.password = password;
  }
  @validateNameDecorator(3) set name(val: string) {
    this._name = val;
  }
  @validateAgeDecorator(1, 100) set age(val: number) {
    this._age = val;
  }
  @validatePasswordDecorator(/^[a-zA-Z0-9]+$/g) set password(val: string) {
    this._password = val;
  }

  get name() {
    return this._name;
  }
  get age() {
    return this._age;
  }
}
// minLength = 1
// min = 1, max = 150
// regex = /^[a-zA-Z0-9!@]+$/g
let user = new User('John', 130, 'hardPassword12');
let user2 = new User('John', 30, '!test');
let user3 = new User('John', 25, '@werty');
let user4 = new User('Jo', 20, 'password123');
