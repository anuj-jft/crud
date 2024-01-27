import { DateTime, DurationLike } from 'luxon';

export class LuxonService {
  static get getCurrentDateTime(): DateTime {
    return DateTime.now();
  }

  static get getStandardDate(): Date {
    return LuxonService.getCurrentDateTime.toJSDate();
  }

  get getStandardDateTime(): DateTime {
    return LuxonService.getCurrentDateTime;
  }

  getPastDateTime = (subtractObj: DurationLike): DateTime => {
    return this.getStandardDateTime.minus(subtractObj);
  };

  getFutureDateTime = (addObj: DurationLike): DateTime => {
    return this.getStandardDateTime.plus(addObj);
  };
}
