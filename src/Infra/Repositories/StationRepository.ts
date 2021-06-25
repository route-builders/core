import { StationFactory } from '../../Domain/factories/StationFactory';
import { Station } from '../../Domain/models/Station';
import { UUID } from '../../Domain/values/common/UUID';
import { StationName } from '../../Domain/values/Station/StationName';
import { StationScale } from '../../Domain/values/Station/StationScale';
import { StationTimeDisplayFormat } from '../../Domain/values/Station/StationTimeDisplayFormat';
import { StationTrainInfoDisplayFormat } from '../../Domain/values/Station/StationTrainInfoDisplayFormat';
import { RequiredUUIDError } from '../../errors/RequiredUUIDError';
import { IStorage } from '../DB/IStorage';

export class StationRepository {
  constructor(private storage: IStorage) {}

  getStation(input: { uuid: UUID }): Station {
    const uuid = input.uuid.value;
    if (!uuid) {
      throw new RequiredUUIDError();
    }
    const rawStation = this.storage.stations.findOne({ uuid });
    if (!rawStation) {
      // TOOD: エラー実装する
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
    const rawStation = this.storage.stations.insert({
      name: input.name.value,
      timeDisplayFormat: input.timeDisplayFormat.value,
      scale: input.scale.value,
      inboundTrainInfoDisplayFormat: input.inboundTrainInfoDisplayFormat.value,
      outboundTrainInfoDisplayFormat: input.outboundTrainInfoDisplayFormat.value,
    });

    if (!rawStation) {
      // TOOD: エラー実装する
      throw new Error();
    }

    return StationFactory.from(rawStation);
  }

  removeStation(input: { uuid: UUID }): void {
    const uuid = input.uuid.value;
    if (!uuid) {
      throw new RequiredUUIDError();
    }

    this.storage.stations.deleteOne({ uuid });
  }
}
