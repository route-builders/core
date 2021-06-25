export class InvokedUnExecutionCommandError implements Error {
  name = InvokedUnExecutionCommandError.name;
  message: string;
  constructor(commandName: string) {
    this.message = `try to re-invoke command before first execution: ${commandName}`;
  }
}
