export interface IDateProvider {
  dateNow(): Date;
  addDays(days: number): Date;
  addHours(hours: number): Date;
  addSeconds(seconds: number): Date;
  compareIfBefore(start_date: Date, end_date: Date): boolean;
}
