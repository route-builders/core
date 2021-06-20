export interface ICommand {
  invoke(): void;
  undo(): void;
}
