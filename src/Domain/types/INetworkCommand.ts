import { UUID } from '../values/common/UUID';
import { NetworkCommandData } from '../values/NetworkCommand/NetworkCommandData';
import { NetworkCommandInvoked } from '../values/NetworkCommand/NetworkCommandInvoked';
import { NetworkCommandName } from '../values/NetworkCommand/NetworkCommandName';

export type INetworkCommand = {
  uuid: UUID;
  name: NetworkCommandName;
  originalData: NetworkCommandData;
  updatedData: NetworkCommandData;
  invoked: NetworkCommandInvoked;
};
