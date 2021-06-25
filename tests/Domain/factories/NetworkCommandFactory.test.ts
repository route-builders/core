import { NetworkCommandFactory } from '../../../src/Domain/factories/NetworkCommandFactory';
import { NetworkCommand } from '../../../src/Domain/models/NetworkCommand';

describe('NetworkCommand factory [true case]:', () => {
  const truecaseName = 'station.insert';
  const truecaseData = {};

  test('正常値を渡し、NetworkCommandインスタンスを返す', () => {
    const input = {
      name: truecaseName,
      originalData: truecaseData,
      updatedData: truecaseData,
      invoked: false,
    };
    expect(NetworkCommandFactory.from(input)).toBeInstanceOf(NetworkCommand);
  });
});

describe('NetworkCommand factory [true case]:', () => {
  // const truecaseName = 'station.insert';
  const truecaseData = {};

  test('コマンド名を空で渡し、エラーを吐く', () => {
    const input = {
      name: '',
      originalData: truecaseData,
      updatedData: truecaseData,
      invoked: false,
    };
    expect(() => {
      NetworkCommandFactory.from(input);
    }).toThrowError();
  });
});
