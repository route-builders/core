export class NoPendingCommandError implements Error {
  name = 'NoPendingCommandError';
  message = 'There is no pending operation.';
}
