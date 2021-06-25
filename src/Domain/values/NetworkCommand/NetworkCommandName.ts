import * as z from 'zod';

export const NetworkCommandNameEnum = {
  insertStation: 'station.insert',
  // ...
};

export const NetworkCommandNameLabels = [
  { value: NetworkCommandNameEnum.insertStation, label: '駅を挿入' },
  // ...
];

export const networkCommandNameSchema = z.string().nonempty();

// TODO: 使うときコメント外す
// const translateNetworkCommandName = (value: NetworkCommandNameValue): string | undefined => {
//   return NetworkCommandNameLabels.find((set) => set.value === value)?.label;
// };

export type NetworkCommandNameValue = z.infer<typeof networkCommandNameSchema>;

export class NetworkCommandName {
  constructor(public value: NetworkCommandNameValue) {
    networkCommandNameSchema.parse(value);
    Object.freeze(this);
  }

  get isInsertStation(): boolean {
    return this.value === NetworkCommandNameEnum.insertStation;
  }
}
