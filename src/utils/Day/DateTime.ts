import dayjs from '../Day/dayjs';

export class DateTime {
  private dayjsInstance: dayjs.Dayjs;
  constructor() {
    this.dayjsInstance = dayjs();
  }

  getDateTimeString(): string {
    return this.dayjsInstance.utc().toISOString();
  }
  getTimeStamp(): number {
    return this.dayjsInstance.utc().unix();
  }
}
