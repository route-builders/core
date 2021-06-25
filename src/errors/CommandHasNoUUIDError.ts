export class CommandHasNoUUIDError implements Error {
  name = 'NoCommandUUIDError';
  message = 'command has no UUID';
}
