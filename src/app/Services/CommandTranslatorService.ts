import { NetworkCommand } from '../../Domain/models/NetworkCommand';
import { UnexpectedCommandError } from '../../errors/UnexpectedCommandError';
import { IStorage } from '../../Infra/DB/IStorage';
import { CreateStationCommand } from '../Commands/CreateStationCommand';
import { ICommand } from '../Commands/ICommand';

export class CommandTranslatorService {
  constructor(private storage: IStorage) {}

  translate(inputCommand: NetworkCommand): ICommand {
    if (inputCommand.name.isInsertStation) {
      return new CreateStationCommand(inputCommand, this.storage);
    } else {
      throw new UnexpectedCommandError(inputCommand.name.value);
    }
  }
}
