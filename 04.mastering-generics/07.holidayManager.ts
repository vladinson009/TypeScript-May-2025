enum TravelVacation {
  Abroad = 'Abroad',
  InCountry = 'InCountry',
}
enum MountainVacation {
  Ski = 'Ski',
  Hiking = 'Hiking',
}
enum BeachVacation {
  Pool = 'Pool',
  Sea = 'Sea',
  ScubaDiving = 'ScubaDiving',
}
interface Holiday {
  set start(val: Date);
  set end(val: Date);
  getInfo(): string;
}
interface VacationManager<T, V> {
  reserveVacation(holiday: T, vacationType: V): void;
  listReservations(): string;
}

type VacationType = TravelVacation | MountainVacation | BeachVacation;
class PlannedHoliday implements Holiday {
  private _start!: Date;
  private _end!: Date;
  constructor(start: Date, end: Date) {
    this.start = start;
    this.end = end;
  }
  set start(val: Date) {
    if (this._end && this._end < val) {
      throw new Error('End date is before start date');
    }
    if (val instanceof Date) {
      this._start = val;
    } else throw new Error('Start date is not instance of Date!');
  }
  set end(val: Date) {
    if (this._start && this._start >= val) {
      throw new Error('End date cannot be before start date');
    }
    if (val instanceof Date) {
      this._end = val;
    } else throw new Error('End date is not instance of Date!');
  }
  getInfo(): string {
    const [startDate, startMonth, startYear] = [
      this._start.getDate(),
      this._start.getMonth() + 1,
      this._start.getFullYear(),
    ];
    const [endDate, endMonth, EndYear] = [
      this._end.getDate(),
      this._end.getMonth() + 1,
      this._end.getFullYear(),
    ];
    return `Holiday: ${startDate}/${startMonth}/${startYear} - ${endDate}/${endMonth}/${EndYear}`;
  }
}
class HolidayManager<T extends Holiday, V extends VacationType>
  implements VacationManager<T, V>
{
  private holidayStore: Map<T, V> = new Map();

  reserveVacation(holiday: T, vacationType: V): void {
    this.holidayStore.set(holiday, vacationType);
  }
  listReservations(): string {
    const holidays: string[] = [];
    [...this.holidayStore.entries()].forEach((entry) => {
      holidays.push(`${entry[0].getInfo()} => ${entry[1]}`);
    });
    return holidays.join('\n');
  }
}

let holiday = new PlannedHoliday(new Date(2024, 1, 1), new Date(2024, 1, 4));
let holiday2 = new PlannedHoliday(new Date(2025, 3, 14), new Date(2024, 3, 17));
let holidayManager = new HolidayManager<Holiday, MountainVacation>();
// holidayManager.reserveVacation(holiday, BeachVacation.ScubaDiving);
// holidayManager.reserveVacation(holiday2, TravelVacation.InCountry);
console.log(holidayManager.listReservations());
