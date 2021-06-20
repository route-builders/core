import * as z from 'zod';

export const StationTimeDisplayFormatEnum = {
  arrival_and_departure: 'arrival_and_departure',
  only_departure: 'only_departure',
  inbound_arrival: 'inbound_arrival',
  outbound_arrival: 'outbound_arrival',
};

export const StationTimeDisplayFormatLabels = [
  { value: 'arrival_and_departure', label: '発着' },
  { value: 'only_departure', label: '発時刻' },
  { value: 'inbound_arrival', label: '上り着時刻' },
  { value: 'outbound_arrival', label: '下り着時刻' },
];

export const stationTimeDisplayFormatSchema = z.enum([
  StationTimeDisplayFormatEnum.arrival_and_departure,
  StationTimeDisplayFormatEnum.only_departure,
  StationTimeDisplayFormatEnum.inbound_arrival,
  StationTimeDisplayFormatEnum.outbound_arrival,
]);

const translateStationTimeDisplayFormat = (value: StationTimeDisplayFormatValue): string | undefined => {
  return StationTimeDisplayFormatLabels.find((set) => set.value === value)?.label;
};

export type StationTimeDisplayFormatValue = z.infer<typeof stationTimeDisplayFormatSchema>;

export class StationTimeDisplayFormat {
  constructor(public value: StationTimeDisplayFormatValue) {
    stationTimeDisplayFormatSchema.parse(value);
    Object.freeze(this);
  }

  get isArrivalAndDeparture(): boolean {
    return this.value === StationTimeDisplayFormatEnum.arrival_and_departure;
  }

  get isOnlyDeparture(): boolean {
    return this.value === StationTimeDisplayFormatEnum.only_departure;
  }

  get isInboundArrival(): boolean {
    return this.value === StationTimeDisplayFormatEnum.inbound_arrival;
  }

  get isOutboundArrival(): boolean {
    return this.value === StationTimeDisplayFormatEnum.outbound_arrival;
  }

  get label(): string | undefined {
    return translateStationTimeDisplayFormat(this.value);
  }
}
