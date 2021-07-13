import { NoPendingCommandError } from '../../../errors/NoPendingCommandError';
import { Client } from '../../Client';
import { ICommand } from '../../Commands/ICommand';
import { AwaitingConfirm } from './AwaitingConfirm';
import { IState } from './IState';

/**
 * @class Synchronized - 同期済みの状態を示すオブジェクト
 */
export class Synchronized implements IState {
  constructor(private client: Client) {
    //
  }

  /**
   * @method applyClient - ローカルでの実行コマンドを受け取り、`AwaitingConfirm` stateを生成する
   *
   * @param currentRevision 現在のバージョン番号オブジェクト
   * @param command 実行コマンド
   *
   *
   */
  public applyClient(command: ICommand): AwaitingConfirm {
    this.client.sendCommand(command);
    return new AwaitingConfirm(this.client, command);
  }

  public applyServer(command: ICommand): IState {
    throw new Error('Method not implemented.');
  }

  public serverAcknowledgment(): IState {
    throw new NoPendingCommandError();
  }
}
