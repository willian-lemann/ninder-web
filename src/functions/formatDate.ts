import { differenceInHours, format, formatDistanceToNow } from "date-fns";

export function formatDate(date: Date | null) {
  if (!date) {
    return null;
  }

  const toDate = new Date(date);

  const hours = differenceInHours(new Date(), toDate);

  if (hours < 24) {
    const formattedDate = format(toDate, "h:mm aa");
    return formattedDate;
  }

  const formattedDate = formatDistanceToNow(toDate);

  return `${formattedDate} ago`;
}
