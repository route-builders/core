import { Station } from '../models/Station';
import { SortOrder } from '../values/common/SortOrder';
import { UUID } from '../values/common/UUID';
import { StationName } from '../values/Station/StationName';
import { StationScale } from '../values/Station/StationScale';
import { StationTimeDisplayFormat } from '../values/Station/StationTimeDisplayFormat';
import { StationTrainInfoDisplayFormat } from '../values/Station/StationTrainInfoDisplayFormat';

export type StationValue = {
  uuid: string;
  name: string;
  timeDisplayFormat: string;
  scale: string;
  inboundTrainInfoDisplayFormat: string;
  outboundTrainInfoDisplayFormat: string;
  order: number;
};

export class StationFactory {
  static from(values: StationValue): Station {
    const {
      uuid,
      name,
      timeDisplayFormat,
      scale,
      inboundTrainInfoDisplayFormat,
      outboundTrainInfoDisplayFormat,
      order,
    } = values;

    return new Station({
      uuid: new UUID(uuid),
      name: new StationName(name),
      timeDisplayFormat: new StationTimeDisplayFormat(timeDisplayFormat),
      scale: new StationScale(scale),
      inboundTrainInfoDisplayFormat: new StationTrainInfoDisplayFormat(inboundTrainInfoDisplayFormat),
      outboundTrainInfoDisplayFormat: new StationTrainInfoDisplayFormat(outboundTrainInfoDisplayFormat),
      order: new SortOrder(order),
    });
  }
}
