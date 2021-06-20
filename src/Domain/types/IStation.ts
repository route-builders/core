import { SortOrder } from '../values/common/SortOrder';
import { UUID } from '../values/common/UUID';
import { StationName } from '../values/Station/StationName';
import { StationScale } from '../values/Station/StationScale';
import { StationTimeDisplayFormat } from '../values/Station/StationTimeDisplayFormat';
import { StationTrainInfoDisplayFormat } from '../values/Station/StationTrainInfoDisplayFormat';

export type IStation = {
  uuid: UUID;
  name: StationName;
  timeDisplayFormat: StationTimeDisplayFormat;
  scale: StationScale;
  inboundTrainInfoDisplayFormat: StationTrainInfoDisplayFormat;
  outboundTrainInfoDisplayFormat: StationTrainInfoDisplayFormat;
  order: SortOrder;
};
