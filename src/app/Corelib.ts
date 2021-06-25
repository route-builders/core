import { NetworkCommandFactory, NetworkCommandValue } from '../Domain/factories/NetworkCommandFactory';
import { IStorage } from '../Infra/DB/IStorage';
import { CommandRepository } from '../Infra/Repositories/CommandRepository';

export class Corelib {
  private commandRepository: CommandRepository;

  constructor(storage: IStorage) {
    this.commandRepository = new CommandRepository(storage);
  }

  receiveRawCommand(rawCommand: NetworkCommandValue): void {
    this.commandRepository.addCommandAndInvoke(NetworkCommandFactory.from(rawCommand));
  }

  receiveUndo(): void {
    this.commandRepository.revertCommands(1);
  }

  receiveRedo(): void {
    this.commandRepository.invokeExistantCommands(1);
  }
}
