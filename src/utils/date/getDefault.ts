export function getDefaultDate(date?: Date, defaultDate?: Date) {
  if (!defaultDate) defaultDate = new Date();
  defaultDate = new Date(defaultDate);

  if (!date) date = defaultDate;
  date = new Date(date);

  return date;
}
