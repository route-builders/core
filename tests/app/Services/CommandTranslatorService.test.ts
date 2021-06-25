import { CreateStationCommand } from '../../../src/app/Commands/CreateStationCommand';
import { CommandTranslatorService } from '../../../src/app/Services/CommandTranslatorService';
import { NetworkCommandData } from '../../../src/Domain/values/NetworkCommand/NetworkCommandData';
import { NetworkCommandInvoked } from '../../../src/Domain/values/NetworkCommand/NetworkCommandInvoked';
import {
  NetworkCommandName,
  NetworkCommandNameEnum,
} from '../../../src/Domain/values/NetworkCommand/NetworkCommandName';
import { StationScaleEnum } from '../../../src/Domain/values/Station/StationScale';
import { StationTimeDisplayFormatEnum } from '../../../src/Domain/values/Station/StationTimeDisplayFormat';
import { StationTrainInfoDisplayFormatEnum } from '../../../src/Domain/values/Station/StationTrainInfoDisplayFormat';
import { InMemoryStorage } from '../../../src/Infra/DB/InMemoryStorage';

describe('CommandTranslatorService [true case]', () => {
  test('正常なコマンド名を入力し、コマンドインスタンスを返す', () => {
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
      invoked: new NetworkCommandInvoked(false),
    };
    const inMemoryStorage = new InMemoryStorage();
    const translator = new CommandTranslatorService(inMemoryStorage);
    expect(translator.translate(input)).toBeInstanceOf(CreateStationCommand);
  });
});

describe('CommandTranslatorService [failure case]', () => {
  test('不正なコマンド名を入力し、エラーを吐く', () => {
    const input = {
      name: new NetworkCommandName('hoge'),
      originalData: new NetworkCommandData({}),
      updatedData: new NetworkCommandData({
        name: 'A',
        timeDisplayFormat: StationTimeDisplayFormatEnum.arrival_and_departure,
        scale: StationScaleEnum.normal,
        inboundTrainInfoDisplayFormat: StationTrainInfoDisplayFormatEnum.always,
        outboundTrainInfoDisplayFormat: StationTrainInfoDisplayFormatEnum.always,
      }),
      invoked: new NetworkCommandInvoked(false),
    };
    const inMemoryStorage = new InMemoryStorage();
    const translator = new CommandTranslatorService(inMemoryStorage);
    expect(() => {
      translator.translate(input);
    }).toThrowError();
  });
});
