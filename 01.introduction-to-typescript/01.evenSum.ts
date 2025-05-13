function evenSum(firstNumb: number, secondNumb: number, thirdNumb: number): boolean {
  return (firstNumb + secondNumb + thirdNumb) % 2 == 0;
}

console.log(evenSum(1, 2, 3)); // even => true
console.log(evenSum(2, 2, 3)); // odd => false
