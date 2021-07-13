import { ICommand } from '../../Commands/ICommand';

export interface IState {
  applyClient(command: ICommand): IState;
  applyServer(command: ICommand): IState;
  serverAcknowledgment(): IState;
}
