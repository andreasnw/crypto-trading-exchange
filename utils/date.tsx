import { isAfter, subDays } from "date-fns";

export const dateSubDays = (date: string | number | Date, amount: number) => {
  return subDays(date, amount);
};

export const dateIsAfter = (
  date: string | number | Date,
  dateToCompare: string | number | Date
) => {
  return isAfter(date, dateToCompare);
};
