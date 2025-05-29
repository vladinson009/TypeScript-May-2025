type PowerOrLogShape = 'power' | 'log';
type RestOfOperationShape = 'add' | 'subtract' | 'multiply' | 'divide';
type Operation = PowerOrLogShape | RestOfOperationShape;

class Calculator {
  public calculate(operation: PowerOrLogShape, a: number, b: number): number;
  public calculate(
    operation: RestOfOperationShape,
    a: number,
    b: number,
    c?: number,
    d?: number
  ): number;
  public calculate(
    operation: Operation,
    a: number,
    b: number,
    c?: number,
    d?: number
  ): number {
    const nums = [a, b, c, d].filter((el) => typeof el == 'number');
    const operations = {
      power: () => a ** b,
      log: () => {
        if (a <= 0 || b <= 0) throw new Error('Invalid log values');
        return Math.log(a) / Math.log(b);
      },
      add: () => nums.reduce((acc, c) => acc + c, 0),
      subtract: () => nums.reduce((acc, c) => acc - c),
      multiply: () => nums.reduce((acc, c) => acc * c),
      divide: () => nums.reduce((acc, c) => acc / c),
    };
    return operations[operation]();
  }
}
const calc = new Calculator();
console.log(calc.calculate('power', 2, 3));
console.log(calc.calculate('power', 4, 1 / 2));
console.log(calc.calculate('log', 8, 2));
console.log(calc.calculate('add', 10, 5));
console.log(calc.calculate('add', 10, 5, 3));
console.log(calc.calculate('subtract', 10, 5));
console.log(calc.calculate('multiply', 2, 3, 4));
console.log(calc.calculate('divide', 100, 5, 2, 2));
