import { StationFactory } from '../Domain/factories/StationFactory';
import { Station } from '../Domain/models/Station';
import { UUID } from '../Domain/values/common/UUID';
import { StationName } from '../Domain/values/Station/StationName';
import { StationScale } from '../Domain/values/Station/StationScale';
import { StationTimeDisplayFormat } from '../Domain/values/Station/StationTimeDisplayFormat';
import { StationTrainInfoDisplayFormat } from '../Domain/values/Station/StationTrainInfoDisplayFormat';
import { IStorage } from './DB/IStorage';

export class StationRepository {
  constructor(private db: IStorage) {}

  getStation(input: { stationUUID: UUID }): Station {
    const rawStation = this.db.stations.findOne({ uuid: input.stationUUID.value });
    if (!rawStation) {
      throw new Error();
    }

    return StationFactory.from(rawStation);
  }

  createStation(input: {
    name: StationName;
    timeDisplayFormat: StationTimeDisplayFormat;
    scale: StationScale;
    inboundTrainInfoDisplayFormat: StationTrainInfoDisplayFormat;
    outboundTrainInfoDisplayFormat: StationTrainInfoDisplayFormat;
  }): Station {
    const rawStation = this.db.stations.insert({
      name: input.name.value,
      timeDisplayFormat: input.timeDisplayFormat.value,
      scale: input.scale.value,
      inboundTrainInfoDisplayFormat: input.inboundTrainInfoDisplayFormat.value,
      outboundTrainInfoDisplayFormat: input.outboundTrainInfoDisplayFormat.value,
    });

    if (!rawStation) {
      throw new Error();
    }

    return StationFactory.from(rawStation);
  }

  removeStation(input: { uuid: UUID }): void {
    this.db.stations.deleteOne({ uuid: input.uuid.value });
  }
}
