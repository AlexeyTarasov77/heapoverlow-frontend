export const humanizeDate = (date: Date): string => {
  date = new Date(date);
  const formattedDate =
    date
      .toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour12: false
      })
      .replace(new RegExp(",", "g"), "") +
    " at " +
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
  return formattedDate;
};
