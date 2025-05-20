interface LocationShape {
  city: string;
  street: string;
  number: number;
  postalCode: number;
  getAddressInfo: () => string;
}
interface NamesShape {
  fName: string;
  lName: string;
  age: number;
  getPersonInfo: () => string;
}

function createCombinedFunction(names: NamesShape, location: LocationShape) {
  return (combined: NamesShape & LocationShape) =>
    `Hello, ${combined.getPersonInfo()} from ${combined.getAddressInfo()}`;
}

let names1 = {
  fName: 'John',
  lName: 'Doe',
  age: 22,
  getPersonInfo() {
    return `${this.fName} ${this.lName}, age ${this.age}`;
  },
};

let location1 = {
  city: 'Boston',
  street: 'Nowhere street',
  number: 13,
  postalCode: 51225,
  getAddressInfo() {
    return `${this.street} ${this.number}, ${this.city} ${this.postalCode}`;
  },
};

let combinedFunction = createCombinedFunction(names1, location1);
let combinedPerson = Object.assign({}, names1, location1);
console.log(combinedFunction(combinedPerson));
