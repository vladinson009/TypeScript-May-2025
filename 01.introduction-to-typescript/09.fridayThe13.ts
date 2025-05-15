enum DaysOfWeek {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}

function fridayThe13(input: unknown[]): void {
  for (const date of input) {
    if (date instanceof Date) {
      const day: number = date.getDate();
      const weekday: number = date.getDay();

      if (DaysOfWeek.Friday == weekday && day === 13) {
        const month: string = date.toLocaleString('en-US', { month: 'long' });
        const year: number = date.getFullYear();
        console.log(`${day}-${month}-${year}`);
      }
    }
  }
}

fridayThe13([
  new Date(2024, 0, 13),
  new Date(2024, 1, 13),
  new Date(2024, 2, 13),
  new Date(2024, 3, 13),
  new Date(2024, 4, 13),
  new Date(2024, 5, 13),
  new Date(2024, 6, 13),
  new Date(2024, 7, 13),
  new Date(2024, 8, 13),
  new Date(2024, 9, 13),
  new Date(2024, 10, 13),
  new Date(2024, 11, 13),
]);
