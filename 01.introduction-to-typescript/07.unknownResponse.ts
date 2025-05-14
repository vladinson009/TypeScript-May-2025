function unknownResponse(first: unknown): string {
  return first !== null &&
    typeof first == 'object' &&
    'value' in first &&
    typeof (first as { value: unknown }).value === 'string'
    ? (first as { value: string }).value
    : 'Invalid Input';
}

console.log(unknownResponse({ code: 200, text: 'Ok', value: 'New Url' }));
