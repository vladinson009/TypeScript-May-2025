type TupleShape = [string, number];

function personFunction(tuple: TupleShape): string {
  const [name, age]: TupleShape = tuple;

  return `Hello, my name is ${name} and my age is ${age}`;
}

console.log(personFunction(['Ivan', 20]));
