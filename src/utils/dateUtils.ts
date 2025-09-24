export function formatDistanceToNow(date: Date, options?: { addSuffix?: boolean }): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  let result: string;

  if (diffInSeconds < 60) {
    result = 'just now';
  } else if (diffInMinutes < 60) {
    result = `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'}`;
  } else if (diffInHours < 24) {
    result = `${diffInHours} hour${diffInHours === 1 ? '' : 's'}`;
  } else if (diffInDays < 7) {
    result = `${diffInDays} day${diffInDays === 1 ? '' : 's'}`;
  } else if (diffInWeeks < 5) {
    result = `${diffInWeeks} week${diffInWeeks === 1 ? '' : 's'}`;
  } else if (diffInMonths < 12) {
    result = `${diffInMonths} month${diffInMonths === 1 ? '' : 's'}`;
  } else {
    result = `${diffInYears} year${diffInYears === 1 ? '' : 's'}`;
  }

  return options?.addSuffix ? `${result} ago` : result;
}