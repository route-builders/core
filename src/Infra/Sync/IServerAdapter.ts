import { ICommand } from '../../app/Commands/ICommand';
import { ISelection } from '../../app/Sync/Selections/ISelection';
import { Revision } from '../../app/Sync/values/Revision';

export interface IServerAdapter {
  sendCommand(revision: Revision, command: ICommand): void;
  sendSelection(selection: ISelection): void;
}
