export class NoRevertDataError implements Error {
  name = 'NoRevertDataError';
  message: string;
  constructor(commandName: string) {
    this.message = `rervert data was not found when undo command: ${commandName}`;
  }
}
