class Person {
  firstName: string;
  lastName: string;
  age: number;

  constructor(firsName: string, lastName: string, age: number) {
    this.firstName = firsName;
    this.lastName = lastName;
    this.age = age;
  }
  introduce(): string {
    return `My name is ${this.firstName} ${this.lastName} and I am ${this.age} years old.`;
  }
}
const person = new Person('John', 'Doe', 30);
console.log(person.introduce());
