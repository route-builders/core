import { CommandNotFoundFromStorageError } from '../../errors/CommandNotFoundFromStorageError';
import { OutOfCommandHistoryRangePointerError } from '../../errors/OutOfCommandHistoryRangePointerError';
import { uuidGenerator } from '../../utils/UUID/uuidGenerator';
import { IStorage, RawCommand, RawStation } from './IStorage';

type DBSchema = {
  commandPointer: number;
  commandHistory: RawCommand[];
  stations: RawStation[];
};

export class InMemoryStorage implements IStorage {
  readonly name = InMemoryStorage.name;

  private storage: DBSchema = {
    commandPointer: 0,
    commandHistory: [],
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

  commandPointer = {
    get: (): number => {
      return this.storage.commandPointer;
    },

    increment: (): void => {
      const nextPointer = (this.storage.commandPointer += 1);
      if (nextPointer < 0 || this.storage.commandHistory.length < nextPointer) {
        throw new OutOfCommandHistoryRangePointerError(nextPointer, this.storage.commandHistory.length);
      }

      this.storage.commandPointer = nextPointer;
    },

    decrement: (): void => {
      const nextPointer = (this.storage.commandPointer -= 1);
      if (nextPointer < 0 || this.storage.commandHistory.length < nextPointer) {
        throw new OutOfCommandHistoryRangePointerError(nextPointer, this.storage.commandHistory.length);
      }

      this.storage.commandPointer = nextPointer;
    },

    updateByUUID: (uuid: string): void => {
      this.storage.commandPointer = this.storage.commandHistory.findIndex((cmd) => cmd.uuid === uuid);
    },
  };

  commandHistory = {
    findByPointer: (props: { pointer: number }): RawCommand | undefined => {
      return this.storage.commandHistory[props.pointer];
    },

    findByUUID: (props: { uuid: string }): RawCommand | undefined => {
      return this.storage.commandHistory.find((cmd) => cmd.uuid === props.uuid);
    },

    insert: (item: {
      uuid: string;
      name: string;
      originalData: unknown;
      updatedData: unknown;
      invoked: boolean;
    }): RawCommand => {
      const rawCommand: RawCommand = { ...item, uuid: uuidGenerator() };
      this.storage.commandHistory.push(rawCommand);
      return rawCommand;
    },

    updateStatusByUUID: (props: { uuid: string; invoked: boolean }): RawCommand => {
      const idx = this.storage.commandHistory.findIndex((cmd) => cmd.uuid === props.uuid);
      if (idx > -1) {
        const rawCommand = { ...(<RawCommand>this.storage.commandHistory[idx]), invoked: props.invoked };
        this.storage.commandHistory[idx] = rawCommand;
        return rawCommand;
      }

      throw new CommandNotFoundFromStorageError();
    },
  };
}
