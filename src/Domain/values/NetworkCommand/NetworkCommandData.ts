import * as z from 'zod';

export const networkCommandDataSchema = z.any().optional();

export type NetworkCommandDataValue = z.infer<typeof networkCommandDataSchema>;

export class NetworkCommandData {
  constructor(public value: NetworkCommandDataValue) {
    networkCommandDataSchema.parse(value);
    Object.freeze(this);
  }
}
