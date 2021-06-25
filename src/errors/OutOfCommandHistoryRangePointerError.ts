export class OutOfCommandHistoryRangePointerError implements Error {
  name = 'OutOfCommandHistoryRangeError';
  message = '';
  constructor(invalidPointer: number, length: number) {
    this.message = `out of range of command history: ${invalidPointer} (length: ${length})`;
  }
}
