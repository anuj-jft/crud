import { DateTime, Duration } from 'luxon';
import { LuxonService } from './luxon.service';

describe('LuxonService', () => {
  const luxonService = new LuxonService();
  const now = DateTime.now();

  it('getStandardDateTime - should return the current date and time in the standard format', () => {
    const result = luxonService.getStandardDateTime;

    expect(result.year).toBe(now.year);
    expect(result.month).toBe(now.month);
    expect(result.day).toBe(now.day);
    expect(result.hour).toBe(now.hour);
    expect(result.minute).toBe(now.minute);
    expect(result.second).toBe(now.second);
  });

  it('getPastDateTime - should return a date and time that is `subtractObj` before the current time', () => {
    const subtractObj = Duration.fromObject({ hours: 2 });
    const now = DateTime.now();
    const expected = now.minus(subtractObj);

    const result = luxonService.getPastDateTime(subtractObj);

    expect(result.hour).toBe(expected.hour);
  });

  it('getFutureDateTime - should return a DateTime object representing a future date', () => {
    const addObj = Duration.fromObject({ days: 7 });
    const futureDateTime = luxonService.getFutureDateTime(addObj);

    expect(futureDateTime).toBeInstanceOf(DateTime);
    expect(futureDateTime.weekNumber).toBeGreaterThan(
      luxonService.getStandardDateTime.weekNumber,
    );
  });
});
