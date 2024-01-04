import {format} from 'date-fns';

/**
 * A collection of common date format strings.
 */
export const DATE_FORMATS = {
  FULL_DATE: 'yyyy-MM-dd',
  DATE_TIME: 'yyyy-MM-dd HH:mm:ss',
  MONTH_DAY_YEAR: 'MM/dd/yyyy',
  YEAR_LONG: 'yyyy',
  YEAR_SHORT: 'yy',
};

/**
 * Provides utility functions for date formatting.
 */
export class DateUtil {
  /**
   * Formats a date string or Date object into a specified format.
   *
   * @param {Date|string} date - The date to format. Can be a Date object or a date string.
   * @param {string} formatStr - The format string, must be one of the values in DATE_FORMATS.
   * @returns {string} The formatted date string.
   *
   * @example
   * const formattedDate = DateUtils.formatDate(new Date(), DATE_FORMATS.FULL_DATE);
   * console.log(formattedDate); // Outputs: 2023-12-12 (depending on the provided date)
   */
  static formatDate(date: Date | string, formatStr: string): string {
    return format(new Date(date), formatStr);
  }

  /**
   * Calculates the relative time description for a given date.
   *
   * @param {Date|string} date - The date to calculate the relative time for. Can be a Date object or a date string.
   * @returns {string} The relative time description.
   *
   * @example
   * // Using a Date object
   * const currentDate = new Date();
   * const oneHourAgo = new Date(currentDate.getTime() - 3600 * 1000);
   * const relativeTime = DateUtils.getRelativeTimeDescription(oneHourAgo);
   * console.log(relativeTime); // Outputs: "1 hour ago"
   *
   * // Using a date string
   * const dateString = "2023-12-12T15:30:00.000Z";
   * const relativeTime = DateUtils.getRelativeTimeDescription(dateString);
   * console.log(relativeTime); // Outputs: "2 days ago"
   */
  static getRelativeTimeDescription(date: Date | string | undefined): string {
    const currentDate = new Date();
    const targetDate = date ? new Date(date) : currentDate;

    const timeDifference = currentDate.getTime() - targetDate.getTime();
    const seconds = Math.floor(timeDifference / 1000);

    if (seconds < 60) {
      return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 48) {
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    }

    const days = Math.floor(hours / 24);
    if (days < 7) {
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }

    return DateUtil.formatDate(targetDate, DATE_FORMATS.FULL_DATE);
  }
}
