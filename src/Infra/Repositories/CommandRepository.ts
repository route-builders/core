import { ICommand } from '../../app/Commands/ICommand';
import { CommandTranslatorService } from '../../app/Services/CommandTranslatorService';
import { NetworkCommandFactory } from '../../Domain/factories/NetworkCommandFactory';
import { UUID } from '../../Domain/values/common/UUID';
import { NetworkCommandData } from '../../Domain/values/NetworkCommand/NetworkCommandData';
import { NetworkCommandInvoked } from '../../Domain/values/NetworkCommand/NetworkCommandInvoked';
import { NetworkCommandName } from '../../Domain/values/NetworkCommand/NetworkCommandName';
import { CommandHasNoUUIDError } from '../../errors/CommandHasNoUUIDError';
import { CommandNotFoundFromStorageError } from '../../errors/CommandNotFoundFromStorageError';
import { uuidGenerator } from '../../utils/UUID/uuidGenerator';
import { IStorage, RawCommand } from '../DB/IStorage';

export class CommandRepository {
  private commandTranslatorService: CommandTranslatorService;
  constructor(private storage: IStorage) {
    this.commandTranslatorService = new CommandTranslatorService(this.storage);
  }

  addCommandAndInvoke(input: {
    uuid?: UUID;
    name: NetworkCommandName;
    originalData: NetworkCommandData;
    updatedData: NetworkCommandData;
    invoked: NetworkCommandInvoked;
  }): RawCommand {
    const command = this.commandTranslatorService.translate(input);
    // TODO: よくない。
    command.invoke();

    const uuid = uuidGenerator();
    const invokedRawCommand = { uuid, ...command.raw };
    this.storage.commandHistory.insert(invokedRawCommand);
    return invokedRawCommand;
  }

  revertCommands(count = 1): void {
    for (let i = 0; i < count; i++) {
      const toRevertCommand = this.getCurrentCommand();
      // TODO: よくない。
      toRevertCommand.undo();

      if (!toRevertCommand.raw.uuid) {
        throw new CommandHasNoUUIDError();
      }
      this.storage.commandHistory.updateStatusByUUID({
        uuid: toRevertCommand.raw.uuid,
        invoked: toRevertCommand.raw.invoked,
      });
      this.storage.commandPointer.decrement();
    }
  }

  invokeExistantCommands(count = 1): void {
    for (let i = 0; i < count; i++) {
      const toInvokeCommand = this.getCurrentCommand();
      // TODO: よくない。
      toInvokeCommand.invoke();

      if (!toInvokeCommand.raw.uuid) {
        throw new CommandHasNoUUIDError();
      }
      this.storage.commandHistory.updateStatusByUUID({
        uuid: toInvokeCommand.raw.uuid,
        invoked: toInvokeCommand.raw.invoked,
      });

      this.storage.commandPointer.increment();
    }
  }

  private getCurrentCommand(): ICommand {
    const pointer = this.storage.commandPointer.get();
    const toRevertRawCommand = this.storage.commandHistory.findByPointer({ pointer });
    if (typeof toRevertRawCommand === 'undefined') {
      throw new CommandNotFoundFromStorageError();
    }

    const translator = new CommandTranslatorService(this.storage);
    return translator.translate(NetworkCommandFactory.from(toRevertRawCommand));
  }
}
