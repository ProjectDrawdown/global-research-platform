import { format } from 'date-fns';

export function getLastUpdated(string) {
  let date = new Date(string);
  return format(date, 'LLL yyyy')
}

