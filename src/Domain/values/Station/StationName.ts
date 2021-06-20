import * as z from 'zod';

// TODO: 標準の最大文字長を定数化したい。
export const stationNameSchema = z.string().nonempty().max(100);

export type StationNameValue = z.infer<typeof stationNameSchema>;

export class StationName {
  constructor(public value: StationNameValue) {
    stationNameSchema.parse(value);
    Object.freeze(this);
  }
}
