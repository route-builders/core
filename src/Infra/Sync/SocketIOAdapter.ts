import { Socket } from 'socket.io';
import { ICommand } from '../../app/Commands/ICommand';
import { ISelection } from '../../app/Sync/Selections/ISelection';
import { Revision } from '../../app/Sync/values/Revision';
import { IServerAdapter } from './IServerAdapter';

const EVENTNAMES = {
  OPERATE: 'operate',
  SELECT: 'select',
  CLIENT_LEFT: 'client_left',
  SET_NAME: 'set_name',
  ACKNOWLEDGMENT: 'acknowledgment',
  RECONNECT: 'reconnect',
};

export class SocketIOAdapter implements IServerAdapter {
  private eventHandlers: { [key: string]: (...args: string[]) => void } = {};

  constructor(private socket: Socket) {
    this.socket
      .on(EVENTNAMES.CLIENT_LEFT, (clientId: string) => {
        this.handleEvent(EVENTNAMES.CLIENT_LEFT, clientId);
      })
      .on(EVENTNAMES.SET_NAME, (clientId: string, name: string) => {
        this.handleEvent(EVENTNAMES.SET_NAME, clientId, name);
      })
      .on(EVENTNAMES.ACKNOWLEDGMENT, () => {
        this.handleEvent(EVENTNAMES.ACKNOWLEDGMENT);
      })
      .on(EVENTNAMES.OPERATE, (clientId: string, operation: string, selection: string) => {
        this.handleEvent(EVENTNAMES.OPERATE, clientId, operation, selection);
      })
      .on(EVENTNAMES.SELECT, (clientId: string, selection: string) => {
        this.handleEvent(EVENTNAMES.SELECT, clientId, selection);
      })
      .on(EVENTNAMES.RECONNECT, () => {
        this.handleEvent(EVENTNAMES.RECONNECT);
      });
  }

  sendCommand(revision: Revision, command: ICommand): void {
    this.socket.emit(EVENTNAMES.OPERATE, revision.toJSON(), command.toJSON());
  }

  sendSelection(selection: ISelection): void {
    this.socket.emit(EVENTNAMES.SELECT, selection.toJSON());
  }

  registerEventHandler(eventName: string, handler: () => void): void {
    this.eventHandlers[eventName] = handler;
  }

  private handleEvent(eventName: string, ...args: string[]): void {
    const handler = this.eventHandlers[eventName];
    if (handler) {
      handler.apply(this, args);
    }
  }
}
