import * as z from 'zod';

export const StationScaleEnum = {
  normal: 'normal',
  main: 'main',
};

export const StationScaleLabels = [
  { value: 'normal', label: '普通駅' },
  { value: 'main', label: '主要駅' },
];

export const stationScaleSchema = z.enum([StationScaleEnum.normal, StationScaleEnum.main]);

const translateStationScale = (value: StationScaleValue): string | undefined => {
  return StationScaleLabels.find((set) => set.value === value)?.label;
};

export type StationScaleValue = z.infer<typeof stationScaleSchema>;

export class StationScale {
  constructor(public value: StationScaleValue) {
    stationScaleSchema.parse(value);
    Object.freeze(this);
  }

  get isNormal(): boolean {
    return this.value === StationScaleEnum.normal;
  }

  get isMain(): boolean {
    return this.value === StationScaleEnum.main;
  }

  get label(): string | undefined {
    return translateStationScale(this.value);
  }
}
