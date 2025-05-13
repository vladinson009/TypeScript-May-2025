enum Days {
  Monday = 1,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}
function dayOfTheWeek(dayNumber: number): void {
  const day: string = Days[dayNumber];
  console.log(day || 'error');
}
dayOfTheWeek(-1); // error
dayOfTheWeek(7); // Sunday
