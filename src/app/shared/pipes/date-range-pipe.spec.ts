import { DateRangePipe } from './date-range-pipe';

describe('DateRangePipe', () => {
  const pipe = new DateRangePipe();

  it('formats a closed range with duration', () => {
    const result = pipe.transform('2019-06', '2022-02');
    expect(result).toContain('Jun 2019');
    expect(result).toContain('Feb 2022');
    expect(result).toContain('yr');
  });

  it('renders "Present" for a null end date', () => {
    const result = pipe.transform('2022-03', null);
    expect(result).toContain('Mar 2022');
    expect(result).toContain('Present');
  });

  it('returns empty string for invalid start', () => {
    expect(pipe.transform('not-a-date', null)).toBe('');
  });
});
