import { differenceInHours, format, formatDistanceToNow } from "date-fns";
import { Timestamp } from "firebase/firestore";

export function formatDate(timestampDate: Timestamp) {
  if (!timestampDate) {
    return null;
  }

  const toDate = new Date(timestampDate.toDate());

  const hours = differenceInHours(new Date(), toDate);

  if (hours < 24) {
    const formattedDate = format(toDate, "h:mm aa");
    return formattedDate;
  }

  const formattedDate = formatDistanceToNow(toDate);

  return `${formattedDate} ago`;
}
