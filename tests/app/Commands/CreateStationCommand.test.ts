import { CreateStationCommand } from '../../../src/app/Commands/CreateStationCommand';
import { NetworkCommandData } from '../../../src/Domain/values/NetworkCommand/NetworkCommandData';
import {
  NetworkCommandName,
  NetworkCommandNameEnum,
} from '../../../src/Domain/values/NetworkCommand/NetworkCommandName';
import { StationScaleEnum } from '../../../src/Domain/values/Station/StationScale';
import { StationTimeDisplayFormatEnum } from '../../../src/Domain/values/Station/StationTimeDisplayFormat';
import { StationTrainInfoDisplayFormatEnum } from '../../../src/Domain/values/Station/StationTrainInfoDisplayFormat';
import { InMemoryStorage } from '../../../src/Infra/DB/InMemoryStorage';

describe('CreateStationCommand#constructor [true case]', () => {
  test('正常な入力を受け取り、バリデーションに成功する', () => {
    const inMemoryStorage = new InMemoryStorage();
    const input = {
      name: new NetworkCommandName(NetworkCommandNameEnum.insertStation),
      originalData: new NetworkCommandData({}),
      updatedData: new NetworkCommandData({
        name: 'A',
        timeDisplayFormat: StationTimeDisplayFormatEnum.arrival_and_departure,
        scale: StationScaleEnum.normal,
        inboundTrainInfoDisplayFormat: StationTrainInfoDisplayFormatEnum.always,
        outboundTrainInfoDisplayFormat: StationTrainInfoDisplayFormatEnum.always,
      }),
    };

    expect(() => {
      new CreateStationCommand(input, inMemoryStorage);
    }).not.toThrowError();
  });
});

describe('CreateStationCommand#constructor [failure case]', () => {
  test('空の駅名を受け取り、バリデーションに失敗する', () => {
    const inMemoryStorage = new InMemoryStorage();
    const input = {
      name: new NetworkCommandName(NetworkCommandNameEnum.insertStation),
      originalData: new NetworkCommandData({}),
      updatedData: new NetworkCommandData({
        name: '',
        timeDisplayFormat: StationTimeDisplayFormatEnum.arrival_and_departure,
        scale: StationScaleEnum.normal,
        inboundTrainInfoDisplayFormat: StationTrainInfoDisplayFormatEnum.always,
        outboundTrainInfoDisplayFormat: StationTrainInfoDisplayFormatEnum.always,
      }),
    };

    expect(() => {
      new CreateStationCommand(input, inMemoryStorage);
    }).toThrowError();
  });

  test('不正な時刻形式を受け取り、バリデーションに失敗する', () => {
    const inMemoryStorage = new InMemoryStorage();
    const input = {
      name: new NetworkCommandName(NetworkCommandNameEnum.insertStation),
      originalData: new NetworkCommandData({}),
      updatedData: new NetworkCommandData({
        name: 'A',
        timeDisplayFormat: 'hoge',
        scale: StationScaleEnum.normal,
        inboundTrainInfoDisplayFormat: StationTrainInfoDisplayFormatEnum.always,
        outboundTrainInfoDisplayFormat: StationTrainInfoDisplayFormatEnum.always,
      }),
    };

    expect(() => {
      new CreateStationCommand(input, inMemoryStorage);
    }).toThrowError();
  });

  test('不正な駅規模を受け取り、バリデーションに失敗する', () => {
    const inMemoryStorage = new InMemoryStorage();
    const input = {
      name: new NetworkCommandName(NetworkCommandNameEnum.insertStation),
      originalData: new NetworkCommandData({}),
      updatedData: new NetworkCommandData({
        name: 'A',
        timeDisplayFormat: StationTimeDisplayFormatEnum.arrival_and_departure,
        scale: 'hoge',
        inboundTrainInfoDisplayFormat: StationTrainInfoDisplayFormatEnum.always,
        outboundTrainInfoDisplayFormat: StationTrainInfoDisplayFormatEnum.always,
      }),
    };

    expect(() => {
      new CreateStationCommand(input, inMemoryStorage);
    }).toThrowError();
  });

  test('不正な上り列車表示形式を受け取り、バリデーションに失敗する', () => {
    const inMemoryStorage = new InMemoryStorage();
    const input = {
      name: new NetworkCommandName(NetworkCommandNameEnum.insertStation),
      originalData: new NetworkCommandData({}),
      updatedData: new NetworkCommandData({
        name: 'A',
        timeDisplayFormat: StationTimeDisplayFormatEnum.arrival_and_departure,
        scale: StationScaleEnum.normal,
        inboundTrainInfoDisplayFormat: 'hoge',
        outboundTrainInfoDisplayFormat: StationTrainInfoDisplayFormatEnum.always,
      }),
    };

    expect(() => {
      new CreateStationCommand(input, inMemoryStorage);
    }).toThrowError();
  });

  test('不正な下り列車表示形式を受け取り、バリデーションに失敗する', () => {
    const inMemoryStorage = new InMemoryStorage();
    const input = {
      name: new NetworkCommandName(NetworkCommandNameEnum.insertStation),
      originalData: new NetworkCommandData({}),
      updatedData: new NetworkCommandData({
        name: 'A',
        timeDisplayFormat: StationTimeDisplayFormatEnum.arrival_and_departure,
        scale: StationScaleEnum.normal,
        inboundTrainInfoDisplayFormat: StationTrainInfoDisplayFormatEnum.always,
        outboundTrainInfoDisplayFormat: 'hoge',
      }),
    };

    expect(() => {
      new CreateStationCommand(input, inMemoryStorage);
    }).toThrowError();
  });
});

describe('CreateStationCommand#invoke [true case]', () => {
  test('コマンド実行に成功する', () => {
    const inMemoryStorage = new InMemoryStorage();
    const input = {
      name: new NetworkCommandName(NetworkCommandNameEnum.insertStation),
      originalData: new NetworkCommandData({}),
      updatedData: new NetworkCommandData({
        name: 'A',
        timeDisplayFormat: StationTimeDisplayFormatEnum.arrival_and_departure,
        scale: StationScaleEnum.normal,
        inboundTrainInfoDisplayFormat: StationTrainInfoDisplayFormatEnum.always,
        outboundTrainInfoDisplayFormat: StationTrainInfoDisplayFormatEnum.always,
      }),
    };
    expect(() => {
      const command = new CreateStationCommand(input, inMemoryStorage);
      command.invoke();
    }).not.toThrowError();
  });
});

describe('CreateStationCommand#invoke [failure case]', () => {
  test('2回同じコマンドを実行し、エラーを吐く', () => {
    const inMemoryStorage = new InMemoryStorage();
    const input = {
      name: new NetworkCommandName(NetworkCommandNameEnum.insertStation),
      originalData: new NetworkCommandData({}),
      updatedData: new NetworkCommandData({
        name: 'A',
        timeDisplayFormat: StationTimeDisplayFormatEnum.arrival_and_departure,
        scale: StationScaleEnum.normal,
        inboundTrainInfoDisplayFormat: StationTrainInfoDisplayFormatEnum.always,
        outboundTrainInfoDisplayFormat: StationTrainInfoDisplayFormatEnum.always,
      }),
    };
    expect(() => {
      const command = new CreateStationCommand(input, inMemoryStorage);
      command.invoke();
      command.invoke();
    }).toThrowError();
  });
});
