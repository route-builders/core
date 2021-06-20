import * as z from 'zod';

export const StationTrainInfoDisplayFormatEnum = {
  only_departures: 'only_departures',
  always: 'always',
  none: 'none',
};

export const StationTrainInfoDisplayFormatLabels = [
  { value: 'only_departures', label: '始発のみ' },
  { value: 'always', label: '常に表示' },
  { value: 'none', label: '表示しない' },
];

export const stationTrainInfoDisplayFormatSchema = z.enum([
  StationTrainInfoDisplayFormatEnum.only_departures,
  StationTrainInfoDisplayFormatEnum.always,
  StationTrainInfoDisplayFormatEnum.none,
]);

const translateStationTrainInfoDisplayFormat = (value: StationTrainInfoDisplayFormatValue): string | undefined => {
  return StationTrainInfoDisplayFormatLabels.find((set) => set.value === value)?.label;
};

export type StationTrainInfoDisplayFormatValue = z.infer<typeof stationTrainInfoDisplayFormatSchema>;

export class StationTrainInfoDisplayFormat {
  constructor(public value: StationTrainInfoDisplayFormatValue) {
    stationTrainInfoDisplayFormatSchema.parse(value);
    Object.freeze(this);
  }

  get isOnlyDepartures(): boolean {
    return this.value === StationTrainInfoDisplayFormatEnum.only_departures;
  }

  get isAlways(): boolean {
    return this.value === StationTrainInfoDisplayFormatEnum.always;
  }

  get isNone(): boolean {
    return this.value === StationTrainInfoDisplayFormatEnum.always;
  }

  get label(): string | undefined {
    return translateStationTrainInfoDisplayFormat(this.value);
  }
}
