export class OutOfCommandHistoryRangeRevisionCountError implements Error {
  name = 'OutOfCommandHistoryRangeRevisionCountError';
  message = '';
  constructor(invalidCount: number, length: number) {
    this.message = `out of range of command history: ${invalidCount} (length: ${length})`;
  }
}
