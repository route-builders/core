import * as z from 'zod';

export const uuidSchema = z.string().uuid();

export type UUIDValue = z.infer<typeof uuidSchema>;

export class UUID {
  constructor(public value: UUIDValue) {
    uuidSchema.parse(value);
    Object.freeze(this);
  }
}
