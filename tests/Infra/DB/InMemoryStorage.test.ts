import { InMemoryStorage } from '../../../src/Infra/DB/InMemoryStorage';

describe('InMemoryStorage#stations.insert [true case]', () => {
  test('新規データを追加し、stationのrawオブジェクトが返る', () => {
    const storage = new InMemoryStorage();
    expect(
      storage.stations.insert({
        name: 'A',
        timeDisplayFormat: 'B',
        scale: 'C',
        inboundTrainInfoDisplayFormat: 'D',
        outboundTrainInfoDisplayFormat: 'E',
      })
    ).toMatchObject({
      name: 'A',
      timeDisplayFormat: 'B',
      scale: 'C',
      inboundTrainInfoDisplayFormat: 'D',
      outboundTrainInfoDisplayFormat: 'E',
    });
  });
});

describe('InMemoryStorage#stations.insert, #stations.findOne [true case]', () => {
  test('新規データを追加し、返ったrawオブジェクトのUUIDで取得できる', () => {
    const storage = new InMemoryStorage();
    const raw = storage.stations.insert({
      name: 'A',
      timeDisplayFormat: 'B',
      scale: 'C',
      inboundTrainInfoDisplayFormat: 'D',
      outboundTrainInfoDisplayFormat: 'E',
    });
    expect(storage.stations.findOne({ uuid: raw.uuid })).toMatchObject({
      name: 'A',
      timeDisplayFormat: 'B',
      scale: 'C',
      inboundTrainInfoDisplayFormat: 'D',
      outboundTrainInfoDisplayFormat: 'E',
    });
  });
});
