import { formatDate } from '@angular/common';

export type Range = '1D' | '2D' | '1W';

export const ranges: Range[] = ['1D', '2D', '1W'];

export function getIntervalInMinutes(range: Range): number {
  switch (range) {
    case '1D':
      return 2;
    case '2D':
      return 4;
    case '1W':
      return 30;
    default:
      return 1;
  }
}

export function getStartDate(range: Range): string {
  const date = new Date();
  switch (range) {
    case '1D':
      date.setDate(date.getDate());
      break;
    case '2D':
      date.setDate(date.getDate() - 1);
      break;
    case '1W':
      date.setDate(date.getDate() - 6);
      break;
  }
  return format(date);
}

const format = (date: Date): string => {
  console.log(date);
  return formatDate(date, 'YYYY-MM-dd', 'en') + ' 00:00:00';
};
