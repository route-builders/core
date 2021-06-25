import { INetworkCommand } from '../types/INetworkCommand';
import { UUID } from '../values/common/UUID';
import { NetworkCommandData } from '../values/NetworkCommand/NetworkCommandData';
import { NetworkCommandInvoked } from '../values/NetworkCommand/NetworkCommandInvoked';
import { NetworkCommandName } from '../values/NetworkCommand/NetworkCommandName';

export class NetworkCommand implements INetworkCommand {
  uuid?: UUID;
  name: NetworkCommandName;
  originalData: NetworkCommandData;
  updatedData: NetworkCommandData;
  invoked: NetworkCommandInvoked;

  constructor(props: INetworkCommand) {
    this.uuid = new UUID(props.uuid?.value);
    this.name = new NetworkCommandName(props.name.value);
    this.originalData = new NetworkCommandData(props.originalData.value);
    this.updatedData = new NetworkCommandData(props.updatedData.value);
    this.invoked = new NetworkCommandInvoked(props.invoked.value);
    Object.freeze(this);
  }
}
