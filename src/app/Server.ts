import { NetworkCommandFactory } from '../Domain/factories/NetworkCommandFactory';
import { OutOfCommandHistoryRangeRevisionCountError } from '../errors/OutOfCommandHistoryRangeRevisionCountError';
import { IStorage } from '../Infra/DB/IStorage';
import { ICommand } from './Commands/ICommand';
import { commandComparer } from './Services/commandComparer';
import { CommandTranslatorService } from './Services/CommandTranslatorService';
import { Revision } from './Sync/values/Revision';

export class Server {
  private commandTranslator: CommandTranslatorService;
  constructor(private storage: IStorage) {
    this.commandTranslator = new CommandTranslatorService(this.storage);
  }

  public receiveCommand(networkRevision: string, networkCommand: string): ICommand[] {
    const revision = Revision.fromJSON(networkRevision);
    const commandHistoryLength = this.storage.commandHistory.length;
    if (commandHistoryLength < revision.raw) {
      throw new OutOfCommandHistoryRangeRevisionCountError(revision.raw, commandHistoryLength);
    }

    const receivedCommand = this.commandTranslator.translate(NetworkCommandFactory.fromJSON(networkCommand));
    const concurrentCommands = this.storage.commandHistory
      .findAllByCounter({ counter: revision.raw })
      .map(NetworkCommandFactory.from)
      .map(this.commandTranslator.translate);
    const applyCommands = [...concurrentCommands, receivedCommand].sort(commandComparer);
    applyCommands.map((cmd) => cmd.invoke);

    return applyCommands;
  }
}
