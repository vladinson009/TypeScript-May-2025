export {};

function createdOnDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    createdOn = new Date();
  };
}

/**
 * addCreatedOn<T extends { new(...args: any[]){}}>(constructor:T){}
 * return class extends constructor {
 * createdOn = new Date()}
 * ! Done
 *
 * getLatest(seconds:number) {
 * return func w target methodName, descr
 * save original method
 * modify and save allItems from originalMethod.call(this) in const
 * currentTime in new Date
 * save recent items by filtering all items by given criteria
 * return recent items
 * return descriptor
 * ! Done
 *
 * func censorProps<T extends {[key:string]: any}>(censorService: mockCensorService<T>){
 * return func w target, methodName, descriptor
 * save original method
 * modify method
 * save all items with originalMehtod.call(this)
 * save censoredItems from censorService.censorProp(allItems)
 * return censored items
 * return descriptor}
 * }
 * ! Done
 *
 * func log with target, methodName, descriptor
 * save original method
 * modify the method
 * log called successfully
 * return orignal method with call(this)
 * return descriptor
 * ! Done
 * add decorators to given methods
 * ? test
 *TODO:
 * addCreatedOn decorator on User and Employee
 * GetUserDecorator && cenosProps on getUser
 * log && GetUserDecorator on getEmployee
 */

function getUserDecorator(seconds: number) {
  return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function () {
      const allItems = originalMethod.call(this);
      const currentTime = new Date();
      const recentItems = allItems.filter(
        (val: User & { createdOn: Date }) =>
          currentTime.getTime() - val.createdOn.getTime() <= seconds * 1000
      );
      return recentItems;
    };
    return descriptor;
  };
}
function censorProps<T extends { [key: string]: any }>(
  censorService: MockCensorService<T>
) {
  return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function () {
      const allItems = originalMethod.call(this);
      const censoredItems = censorService.censorProperties(allItems);
      return censoredItems;
    };
    return descriptor;
  };
}
function log() {
  return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function () {
      console.log(`Method ${methodName} called successfully`);
      return originalMethod.call(this);
    };
    return descriptor;
  };
}
class MockCensorService<T extends { [key: string]: any }> {
  constructor(private censoredProperties: string[]) {}

  censorProperties(items: T[]) {
    let censoredItems = items.slice();
    censoredItems.forEach((i) => {
      this.censoredProperties.forEach((prop) => {
        delete i[prop];
      });
    });

    return censoredItems;
  }
}
let userCensorService = new MockCensorService<User>(['creditCardNumber']);
let employeeCensorService = new MockCensorService<Employee>(['birthday', 'salary']);
@createdOnDecorator
class User {
  constructor(
    public name: string,
    public age: number,
    public creditCardNumber: string
  ) {}
  getInfo() {
    return `${this.name}, Age: ${this.age} CreditCardNumber: ${this.creditCardNumber}`;
  }
}
@createdOnDecorator
class Employee {
  constructor(public name: string, public birthday: Date, public salary: number) {}
  getInfo() {
    return `${this.name}, Birthday: ${this.birthday?.toLocaleDateString()} Salary: ${
      this.salary
    }`;
  }
}

class UsersService {
  private _users: User[];
  private _employees: Employee[];
  constructor(users: User[], employees: Employee[]) {
    this._users = users;
    this._employees = employees;
  }

  addUser(user: User) {
    this._users.push(user);
  }
  addEmployee(employee: Employee) {
    this._employees.push(employee);
  }

  @getUserDecorator(5) @censorProps(userCensorService) getUsers() {
    return this._users;
  }
  @log() @getUserDecorator(10) @censorProps(employeeCensorService) getEmployees() {
    return this._employees;
  }
}

const user1 = new User('John Does', 30, 'ABCD-1234');
const user2 = new User('Benny Tres', 23, 'EFGH-5678');
const emp1 = new Employee('Sarah Connor', new Date(1964, 4, 15), 2500);
const emp2 = new Employee('Arnold Schwarzenegger', new Date(1947, 6, 30), 3500);
let usersService = new UsersService([user1, user2], [emp1, emp2]);
let users = usersService.getUsers();
console.log(users.map((x) => x.getInfo()));
let employees = usersService.getEmployees();
console.log(employees.map((x) => x.getInfo()));

//7 seconds later
setTimeout(() => {
  const user3 = new User('Jimmy Quatro', 27, 'IJKL-9012');
  const emp3 = new Employee('Kyle Reese', new Date(2004, 0, 1), 2000);
  usersService.addUser(user3);
  usersService.addEmployee(emp3);
  let users = usersService.getUsers();
  console.log(users.map((x) => x.getInfo()));
  let employees = usersService.getEmployees();
  console.log(employees.map((x) => x.getInfo()));
}, 7000);

//15 seconds later
setTimeout(() => {
  let users = usersService.getUsers();
  console.log(users.map((x) => x.getInfo()));
  let employees = usersService.getEmployees();
  console.log(employees.map((x) => x.getInfo()));
}, 15000);
