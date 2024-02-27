import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { IDateProvider } from "~/_shared/application";

dayjs.extend(utc);

export class DayjsDateProvider implements IDateProvider {
  dateNow(): Date {
    return dayjs().toDate();
  }

  addDays(days: number): Date {
    return dayjs().add(days, "days").toDate();
  }

  addHours(hours: number): Date {
    return dayjs().add(hours, "hours").toDate();
  }

  addSeconds(seconds: number): Date {
    return dayjs().add(seconds, "seconds").toDate();
  }

  compareIfBefore(start_date: Date, end_date: Date): boolean {
    return dayjs(start_date).isBefore(end_date);
  }
}
