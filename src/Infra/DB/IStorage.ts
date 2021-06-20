import { StationValue } from '../../Domain/factories/StationFactory';

type RawStation = StationValue;

export interface IStorage {
  readonly name: string;

  stations: {
    findOne: ({ uuid }: { uuid: string }) => RawStation | undefined;

    insert: ({
      name,
      timeDisplayFormat,
      scale,
      inboundTrainInfoDisplayFormat,
      outboundTrainInfoDisplayFormat,
    }: {
      name: string;
      timeDisplayFormat: string;
      scale: string;
      inboundTrainInfoDisplayFormat: string;
      outboundTrainInfoDisplayFormat: string;
    }) => RawStation | undefined;

    deleteOne: ({ uuid }: { uuid: string }) => void;
  };
}
