function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalProperty = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(
      `Function '${propertyKey}' called with arguments: ${args.join(', ')}`
    );
    return originalProperty(args);
  };
}

class Person {
  public fName: string;
  public lName: string;

  @log static getFullName(firstName: string, lastName: string) {
    return `${firstName} ${lastName}`;
  }

  constructor(firstName: string, lastName: string) {
    this.fName = firstName;
    this.lName = lastName;
  }
}
let person = new Person('John', 'Does');
Person.getFullName(person.fName, person.lName);
Person.getFullName('Benny', 'Tres');
