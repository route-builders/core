export class CommandNotFoundFromStorageError implements Error {
  name = 'CommandNotFoundFromStorageError';
  message = 'Command was not found from command storage.';
}
