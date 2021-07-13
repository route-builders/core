import { NetworkCommand } from '../models/NetworkCommand';
import { UUID } from '../values/common/UUID';
import { NetworkCommandData } from '../values/NetworkCommand/NetworkCommandData';
import { NetworkCommandInvoked } from '../values/NetworkCommand/NetworkCommandInvoked';
import { NetworkCommandName } from '../values/NetworkCommand/NetworkCommandName';

export type NetworkCommandValue = {
  uuid: string;
  name: string;
  originalData: unknown;
  updatedData: unknown;
  invoked: boolean;
};

export class NetworkCommandFactory {
  static from(values: NetworkCommandValue): NetworkCommand {
    const { uuid, name, originalData, updatedData, invoked } = values;

    return new NetworkCommand({
      uuid: new UUID(uuid),
      name: new NetworkCommandName(name),
      originalData: new NetworkCommandData(originalData),
      updatedData: new NetworkCommandData(updatedData),
      invoked: new NetworkCommandInvoked(invoked),
    });
  }

  static fromJSON(value: string): NetworkCommand {
    return NetworkCommandFactory.from(JSON.parse(value));
  }
}
