import { StationValue } from '../../Domain/factories/StationFactory';
import { uuidGenerator } from '../../utils/UUID/uuidGenerator';
import { IStorage } from './IStorage';

type RawStation = StationValue;

type DBSchema = {
  stations: RawStation[];
};

export class InMemoryStorage implements IStorage {
  readonly name = InMemoryStorage.name;

  private storage: DBSchema = {
    stations: [],
  };
  stations = {
    findOne: ({ uuid }: { uuid: string }): RawStation | undefined => {
      return this.storage.stations.find((station) => station.uuid === uuid);
    },

    insert: (item: {
      name: string;
      timeDisplayFormat: string;
      scale: string;
      inboundTrainInfoDisplayFormat: string;
      outboundTrainInfoDisplayFormat: string;
    }): RawStation | undefined => {
      const rawStation: RawStation = { ...item, uuid: uuidGenerator(), order: this.storage.stations.length };
      this.storage.stations.push(rawStation);
      return rawStation;
    },

    deleteOne: ({ uuid }: { uuid: string }): void => {
      this.storage.stations = this.storage.stations.filter((station) => station.uuid !== uuid);
    },
  };
}
