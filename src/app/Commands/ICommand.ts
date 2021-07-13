import { NetworkCommandValue } from '../../Domain/factories/NetworkCommandFactory';

export interface ICommand {
  // 競合した場合の実行優先度
  readonly priority: number;

  invoke(): void;
  undo(): void;
  // getter
  raw: NetworkCommandValue;

  toJSON(): string;
}
