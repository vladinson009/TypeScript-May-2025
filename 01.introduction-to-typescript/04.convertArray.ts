function convertArray(array: string[]): [string, number] {
  const text: string = array.join('');
  return [text, text.length];
}

console.log(convertArray(['How', 'are', 'you?']));
console.log(
  convertArray(['Today', ' is', ' a ', 'nice', ' ', 'day for ', 'TypeScript'])
);
