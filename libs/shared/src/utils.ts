import { z } from 'zod';
import { DateTime } from 'luxon';

export const luxonDateTime = z
  .custom<DateTime>((val) => DateTime.isDateTime(val))
  .transform((arg) => {
    return arg.toUTC().toISO() as string;
  });

export function formatDate(plainDate: string): string {
  return DateTime.fromISO(plainDate).toLocaleString(DateTime.DATETIME_SHORT);
}
