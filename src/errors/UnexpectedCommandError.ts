export class UnexpectedCommandError implements Error {
  name = UnexpectedCommandError.name;
  message: string;
  constructor(commandName: string) {
    this.message = `unexpected command name: ${commandName}`;
  }
}
