import { format, parseISO } from 'date-fns';

export function formatDate(dateString: string, formatStr: string = 'MMMM d, yyyy'): string {
  try {
    return format(parseISO(dateString), formatStr);
  } catch (error) {
    return dateString; // Return original string if parsing fails
  }
}
