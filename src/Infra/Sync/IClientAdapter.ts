import { ICommand } from '../../app/Commands/ICommand';

export interface IClientAdapter {
  applyCommand(command: ICommand): void;
}
