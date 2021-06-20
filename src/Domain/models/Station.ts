import { IStation } from '../types/IStation';
import { SortOrder } from '../values/common/SortOrder';
import { UUID } from '../values/common/UUID';
import { StationName } from '../values/Station/StationName';
import { StationScale } from '../values/Station/StationScale';
import { StationTimeDisplayFormat } from '../values/Station/StationTimeDisplayFormat';
import { StationTrainInfoDisplayFormat } from '../values/Station/StationTrainInfoDisplayFormat';

export class Station implements IStation {
  uuid: UUID;
  name: StationName;
  timeDisplayFormat: StationTimeDisplayFormat;
  scale: StationScale;
  inboundTrainInfoDisplayFormat: StationTrainInfoDisplayFormat;
  outboundTrainInfoDisplayFormat: StationTrainInfoDisplayFormat;
  order: SortOrder;

  constructor(props: IStation) {
    this.uuid = new UUID(props.uuid.value);
    this.name = new StationName(props.name.value);
    this.timeDisplayFormat = new StationTimeDisplayFormat(props.timeDisplayFormat.value);
    this.scale = new StationScale(props.scale.value);
    this.inboundTrainInfoDisplayFormat = new StationTrainInfoDisplayFormat(props.inboundTrainInfoDisplayFormat.value);
    this.outboundTrainInfoDisplayFormat = new StationTrainInfoDisplayFormat(props.outboundTrainInfoDisplayFormat.value);
    this.order = new SortOrder(props.order.value);
    Object.freeze(this);
  }
}
