export class ReInvokeCommandError implements Error {
  name = ReInvokeCommandError.name;
  message: string;
  constructor(commandName: string) {
    this.message = `re-invoke command: ${commandName}`;
  }
}
