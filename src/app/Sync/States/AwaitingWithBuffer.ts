import { Client } from '../../Client';
import { ICommand } from '../../Commands/ICommand';
import { commandComparer } from '../../Services/commandComparer';
import { IState } from './IState';
import { Synchronized } from './Synchronized';

export class AwaitingWithBuffer implements IState {
  constructor(private client: Client, private buffer: ICommand[], private command: ICommand) {
    //
  }
  applyClient(command: ICommand): IState {
    this.client.
    const newBuffer = [...this.buffer, this.command].sort(commandComparer);
    return new AwaitingWithBuffer(this.client, newBuffer, command);
  }

  applyServer(command: ICommand): IState {
    const concurrentCommands = [...this.buffer, command].sort(commandComparer);
    concurrentCommands.map((command) => command.invoke);
    return new Synchronized(this.client);
  }

  serverAcknowledgment(): IState {
    throw new Error('Method not implemented.');
  }
}
