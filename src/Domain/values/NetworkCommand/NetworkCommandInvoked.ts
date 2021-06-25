import * as z from 'zod';

export const networkCommandInvokedSchema = z.boolean();

export type NetworkCommandInvokedValue = z.infer<typeof networkCommandInvokedSchema>;

export class NetworkCommandInvoked {
  constructor(public value: NetworkCommandInvokedValue) {
    networkCommandInvokedSchema.parse(value);
    Object.freeze(this);
  }
}
