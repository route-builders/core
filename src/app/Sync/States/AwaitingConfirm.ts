import { Client } from '../../Client';
import { ICommand } from '../../Commands/ICommand';
import { AwaitingWithBuffer } from './AwaitingWithBuffer';
import { IState } from './IState';

export class AwaitingConfirm implements IState {
  constructor(private client: Client, private pendingCommand: ICommand) {
    //
  }
  applyClient(command: ICommand): IState {
    return new AwaitingWithBuffer(this.client, [this.pendingCommand], command);
  }
  applyServer(command: ICommand): IState {
    throw new Error('Method not implemented.');
  }
  serverAcknowledgment(): IState {
    throw new Error('Method not implemented.');
  }
}
