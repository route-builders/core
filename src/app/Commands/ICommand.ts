import { NetworkCommandValue } from '../../Domain/factories/NetworkCommandFactory';

export interface ICommand {
  invoke(): void;
  undo(): void;
  // getter
  raw: NetworkCommandValue;
}
