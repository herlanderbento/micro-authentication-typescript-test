import { isDate, parse } from 'date-fns';

export function parseDateString(value: Date, originalValue: Date) {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, 'dd-MM-yyyy', new Date());

  return parsedDate;
}
