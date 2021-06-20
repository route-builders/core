import { StationFactory } from '../../../src/Domain/factories/StationFactory';
import { Station } from '../../../src/Domain/models/Station';
import { StationScaleEnum } from '../../../src/Domain/values/Station/StationScale';
import { StationTimeDisplayFormatEnum } from '../../../src/Domain/values/Station/StationTimeDisplayFormat';
import { StationTrainInfoDisplayFormatEnum } from '../../../src/Domain/values/Station/StationTrainInfoDisplayFormat';

describe('Station factory [true case]:', () => {
  const truecaseUUID = '0241798E-B129-408B-8485-22FFB9484820';
  const truecaseName = 'A';

  test('正常値を渡し、Stationインスタンスを返す', () => {
    const input = {
      uuid: truecaseUUID,
      name: truecaseName,
      timeDisplayFormat: StationTimeDisplayFormatEnum.arrival_and_departure,
      scale: StationScaleEnum.normal,
      inboundTrainInfoDisplayFormat: StationTrainInfoDisplayFormatEnum.always,
      outboundTrainInfoDisplayFormat: StationTrainInfoDisplayFormatEnum.always,
      order: 0,
    };
    expect(StationFactory.from(input)).toBeInstanceOf(Station);
  });
});

describe('Station factory [failure case]:', () => {
  const truecaseUUID = '0241798E-B129-408B-8485-22FFB9484820';
  const truecaseName = 'A';

  test('空のUUIDを投入し、エラーを吐く', () => {
    const input = {
      uuid: '',
      name: truecaseName,
      timeDisplayFormat: StationTimeDisplayFormatEnum.arrival_and_departure,
      scale: StationScaleEnum.normal,
      inboundTrainInfoDisplayFormat: StationTrainInfoDisplayFormatEnum.always,
      outboundTrainInfoDisplayFormat: StationTrainInfoDisplayFormatEnum.always,
      order: 0,
    };
    expect(() => {
      StationFactory.from(input);
    }).toThrowError();
  });

  test('空の駅名を投入し、エラーを吐く', () => {
    const input = {
      uuid: truecaseUUID,
      name: '',
      timeDisplayFormat: StationTimeDisplayFormatEnum.arrival_and_departure,
      scale: StationScaleEnum.normal,
      inboundTrainInfoDisplayFormat: StationTrainInfoDisplayFormatEnum.always,
      outboundTrainInfoDisplayFormat: StationTrainInfoDisplayFormatEnum.always,
      order: 0,
    };
    expect(() => {
      StationFactory.from(input);
    }).toThrowError();
  });

  test('長すぎる駅名を投入し、エラーを吐く', () => {
    const input = {
      uuid: truecaseUUID,
      name: 'これで１０１文字ですあああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ',
      timeDisplayFormat: StationTimeDisplayFormatEnum.arrival_and_departure,
      scale: StationScaleEnum.normal,
      inboundTrainInfoDisplayFormat: StationTrainInfoDisplayFormatEnum.always,
      outboundTrainInfoDisplayFormat: StationTrainInfoDisplayFormatEnum.always,
      order: 0,
    };
    expect(() => {
      StationFactory.from(input);
    }).toThrowError();
  });

  test('不正な時刻掲示フォーマットを投入し、エラーを吐く', () => {
    const input = {
      uuid: truecaseUUID,
      name: truecaseName,
      timeDisplayFormat: 'hoge',
      scale: StationScaleEnum.normal,
      inboundTrainInfoDisplayFormat: StationTrainInfoDisplayFormatEnum.always,
      outboundTrainInfoDisplayFormat: StationTrainInfoDisplayFormatEnum.always,
      order: 0,
    };
    expect(() => {
      StationFactory.from(input);
    }).toThrowError();
  });

  test('不正な駅規模フォーマットを投入し、エラーを吐く', () => {
    const input = {
      uuid: truecaseUUID,
      name: truecaseName,
      timeDisplayFormat: StationTimeDisplayFormatEnum.arrival_and_departure,
      scale: 'hoge',
      inboundTrainInfoDisplayFormat: StationTrainInfoDisplayFormatEnum.always,
      outboundTrainInfoDisplayFormat: StationTrainInfoDisplayFormatEnum.always,
      order: 0,
    };
    expect(() => {
      StationFactory.from(input);
    }).toThrowError();
  });

  test('不正な列車情報表示フォーマットを投入し、エラーを吐く(上り)', () => {
    const input = {
      uuid: truecaseUUID,
      name: truecaseName,
      timeDisplayFormat: StationTimeDisplayFormatEnum.arrival_and_departure,
      scale: StationScaleEnum.normal,
      inboundTrainInfoDisplayFormat: 'hoge',
      outboundTrainInfoDisplayFormat: StationTrainInfoDisplayFormatEnum.always,
      order: 0,
    };
    expect(() => {
      StationFactory.from(input);
    }).toThrowError();
  });

  test('不正な列車情報表示フォーマットを投入し、エラーを吐く(下り)', () => {
    const input = {
      uuid: truecaseUUID,
      name: truecaseName,
      timeDisplayFormat: StationTimeDisplayFormatEnum.arrival_and_departure,
      scale: StationScaleEnum.normal,
      inboundTrainInfoDisplayFormat: StationTrainInfoDisplayFormatEnum.always,
      outboundTrainInfoDisplayFormat: '',
      order: 0,
    };
    expect(() => {
      StationFactory.from(input);
    }).toThrowError();
  });

  test('不正な並び順に負数を投入し、エラーを吐く', () => {
    const input = {
      uuid: truecaseUUID,
      name: truecaseName,
      timeDisplayFormat: StationTimeDisplayFormatEnum.arrival_and_departure,
      scale: StationScaleEnum.normal,
      inboundTrainInfoDisplayFormat: StationTrainInfoDisplayFormatEnum.always,
      outboundTrainInfoDisplayFormat: StationTrainInfoDisplayFormatEnum.always,
      order: -1,
    };
    expect(() => {
      StationFactory.from(input);
    }).toThrowError();
  });

  test('不正な並び順にfloat値を投入し、エラーを吐く', () => {
    const input = {
      uuid: truecaseUUID,
      name: truecaseName,
      timeDisplayFormat: StationTimeDisplayFormatEnum.arrival_and_departure,
      scale: StationScaleEnum.normal,
      inboundTrainInfoDisplayFormat: StationTrainInfoDisplayFormatEnum.always,
      outboundTrainInfoDisplayFormat: StationTrainInfoDisplayFormatEnum.always,
      order: 12.34,
    };
    expect(() => {
      StationFactory.from(input);
    }).toThrowError();
  });
});
