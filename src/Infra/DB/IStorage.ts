import { NetworkCommandValue } from '../../Domain/factories/NetworkCommandFactory';
import { StationValue } from '../../Domain/factories/StationFactory';

export type RawCommand = NetworkCommandValue;
export type RawStation = StationValue;

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

  commandPointer: {
    get: () => number;

    increment: () => void;

    decrement: () => void;

    updateByUUID: (uuid: string) => void;
  };

  commandHistory: {
    length: number;

    findByPointer: ({ pointer }: { pointer: number }) => RawCommand | undefined;

    // カウンタ以降のコマンドを全て返却
    findAllByCounter: ({ counter }: { counter: number }) => RawCommand[];

    findByUUID: ({ uuid }: { uuid: string }) => RawCommand | undefined;

    insert: ({
      uuid,
      name,
      originalData,
      updatedData,
      invoked,
    }: {
      uuid: string;
      name: string;
      originalData: unknown;
      updatedData: unknown;
      invoked: boolean;
    }) => RawCommand;

    updateStatusByUUID: ({ uuid, invoked }: { uuid: string; invoked: boolean }) => RawCommand;
  };
}
