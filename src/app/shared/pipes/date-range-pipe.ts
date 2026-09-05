import { Pipe, PipeTransform } from '@angular/core';

/**
 * Formats an experience date range like "Mar 2022 – Present · 2 yrs 5 mos".
 *
 * Pure pipe (default): recomputed only when inputs change — cheap and
 * change-detection friendly. Accepts ISO date strings (YYYY-MM or full ISO);
 * a null end date renders as "Present".
 */
@Pipe({ name: 'dateRange' })
export class DateRangePipe implements PipeTransform {
  private static readonly MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  transform(startDate: string, endDate: string | null): string {
    const start = this.parse(startDate);
    if (!start) {
      return '';
    }
    const end = endDate ? this.parse(endDate) : null;

    const startLabel = this.format(start);
    const endLabel = end ? this.format(end) : 'Present';
    const duration = this.duration(start, end ?? new Date());

    return duration ? `${startLabel} – ${endLabel} · ${duration}` : `${startLabel} – ${endLabel}`;
  }

  private parse(value: string): Date | null {
    // Support "YYYY-MM" by appending a day.
    const normalized = /^\d{4}-\d{2}$/.test(value) ? `${value}-01` : value;
    const date = new Date(normalized);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  private format(date: Date): string {
    return `${DateRangePipe.MONTHS[date.getMonth()]} ${date.getFullYear()}`;
  }

  private duration(start: Date, end: Date): string {
    let months =
      (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    if (months < 0) {
      return '';
    }
    months += 1; // inclusive of the current month
    const years = Math.floor(months / 12);
    const remMonths = months % 12;
    const parts: string[] = [];
    if (years > 0) {
      parts.push(`${years} yr${years > 1 ? 's' : ''}`);
    }
    if (remMonths > 0) {
      parts.push(`${remMonths} mo${remMonths > 1 ? 's' : ''}`);
    }
    return parts.join(' ');
  }
}
