import { ICommand } from '../../app/Commands/ICommand';
import { IClientAdapter } from './IClientAdapter';

export class ClientAdapterImpl implements IClientAdapter {
  applyCommand(command: ICommand): void {
    command.invoke();
  }
}
