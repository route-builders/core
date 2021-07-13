import { IClientAdapter } from '../Infra/Sync/IClientAdapter';
import { IServerAdapter } from '../Infra/Sync/IServerAdapter';
import { ICommand } from './Commands/ICommand';
import { IState } from './Sync/States/IState';
import { Synchronized } from './Sync/States/Synchronized';
import { Revision } from './Sync/values/Revision';

/**
 * @abstract @class Client - クライアント側アプリケーションの抽象実装
 */
export abstract class Client {
  private state: IState;
  constructor(
    private serverAdapter: IServerAdapter,
    private clientAdapter: IClientAdapter,
    private revision: Revision,
    state: Synchronized
  ) {
    this.state = state;
  }

  private updateState(state: IState): void {
    this.state = state;
  }

  /**
   * @method applyClient - クライアント（ローカル）での実行コマンドを受け取るメソッド。
   *
   * @param {ICommand} command - クライアント側での実行コマンド
   */
  public applyClient(command: ICommand): void {
    this.updateState(this.state.applyClient(command));
  }

  /**
   * @method applyServer - サーバーから渡された実行コマンドを受け取るメソッド。
   *
   * @param {ICommand} command - 受け取ったコマンド
   */
  public applyServer(command: ICommand): void {
    this.updateState(this.state.applyServer(command));
  }

  serverAcknowledgment(): void {
    this.revision = this.revision.inc();
    this.updateState(this.state.)
  }

  /**
   * @method sendCommand - ローカルで実行されたコマンドをサーバーへ渡す
   *
   * @param {ICommand} command - 受け取ったコマンド
   */
  public sendCommand(command: ICommand): void {
    this.serverAdapter.sendCommand(this.revision, command);
  }

  /**
   * @method applyCommand - サーバーから渡された実行コマンドを実行する
   *
   * @param {ICommand} command - 受け取ったコマンド
   */
  public applyCommand(command: ICommand): void {
    this.clientAdapter.applyCommand(command);
  }
}
