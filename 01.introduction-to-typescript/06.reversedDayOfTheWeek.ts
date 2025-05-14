enum Weekdays {
  Monday = 1,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}
function reversedDayOfTheWeek(day: string): void {
  console.log(Weekdays[day as keyof typeof Weekdays] ?? 'error');
}

reversedDayOfTheWeek('Tuesday');
