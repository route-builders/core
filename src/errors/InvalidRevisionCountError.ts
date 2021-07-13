export class InvalidRevisionCountError implements Error {
  name = 'InvalidRevisionCountError';
  message: string;
  constructor(count: number) {
    this.message = `Invalid revision count was received: ${count}`;
  }
}
