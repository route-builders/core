import * as z from 'zod';

export const sortOrderSchema = z.number().int().min(0);

export type SortOrderValue = z.infer<typeof sortOrderSchema>;

export class SortOrder {
  constructor(public value: SortOrderValue) {
    sortOrderSchema.parse(value);
    Object.freeze(this);
  }
}
