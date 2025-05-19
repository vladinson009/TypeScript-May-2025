type Param = string | number | string[];
type Operatioin = 'Index' | 'Length' | 'Add';
type Operand = number;
type ReturnValue = string | number | undefined;

function operator(
  value: Param,
  operation: Operatioin,
  operand: Operand
): ReturnValue {
  switch (operation) {
    case 'Index':
      if (typeof value == 'string' || Array.isArray(value)) {
        return value[operand];
      }
    case 'Length':
      if (typeof value == 'string' || Array.isArray(value)) {
        return value.length % operand;
      }
    case 'Add':
      if (typeof value == 'string' || typeof value == 'number') {
        return Number(value) + Number(operand);
      }
  }
}

console.log(operator(['First', 'Second', 'Third'], 'Index', 1));
console.log(operator('string', 'Index', 1));
console.log(operator(['Just', 'Two'], 'Length', 5));
console.log(operator('short string1', 'Length', 5));
console.log(operator('7', 'Add', 3));
console.log(operator(11, 'Add', 3));
