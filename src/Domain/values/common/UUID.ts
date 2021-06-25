import * as z from 'zod';

export const uuidSchema = z.string().uuid().or(z.undefined());

export type UUIDValue = z.infer<typeof uuidSchema>;

export class UUID {
  constructor(public value: UUIDValue) {
    uuidSchema.parse(value);
    Object.freeze(this);
  }
}
