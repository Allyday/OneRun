export const getTimeString = (time: Date | null) => {
  if (!time) return null;

  const hours = (time.getHours() % 12 || 12).toString();
  const minutes = time.getMinutes();
  const partOfDay = time.getHours() < 12 ? 'AM' : 'PM';

  const timeString = `${hours}:${minutes} ${partOfDay}`;
  return timeString;
};
