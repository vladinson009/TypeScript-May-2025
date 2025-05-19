enum Code {
  'OK' = 200,
  'Created' = 201,
  'Bad Request' = 400,
  'Not Found' = 404,
  'Internal Server Error' = 500,
}
interface HttpCode {
  code: Code;
  text: keyof typeof Code;
  printChars?: number;
}

function httpCodes(httpObject: HttpCode): string {
  const isValid = Object.entries(Code).some(
    ([key, value]) => key == httpObject.text && value == httpObject.code
  );
  if (!isValid) {
    throw new Error('Invalid Code or Text');
  }
  if (httpObject.printChars) {
    return httpObject.text.slice(0, httpObject.printChars);
  }
  return httpObject.text;
}

console.log(httpCodes({ code: 200, text: 'OK' }));
console.log(httpCodes({ code: 201, text: 'Created' }));
console.log(httpCodes({ code: 400, text: 'Bad Request', printChars: 4 }));
console.log(httpCodes({ code: 404, text: 'Not Found' }));
console.log(httpCodes({ code: 404, text: 'Not Found', printChars: 3 }));
console.log(httpCodes({ code: 500, text: 'Internal Server Error', printChars: 1 }));
