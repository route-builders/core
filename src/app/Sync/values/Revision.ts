import { InvalidRevisionCountError } from '../../../errors/InvalidRevisionCountError';

/**
 * @class Revision - バージョン番号オブジェクト
 */
export class Revision {
  constructor(private count: number = 0) {
    if (count < 0) {
      throw new InvalidRevisionCountError(count);
    }
    Object.freeze(this);
  }

  inc(): Revision {
    return new Revision(this.count + 1);
  }

  get raw(): number {
    return this.count;
  }

  toJSON(): string {
    return JSON.stringify({ count: this.count });
  }

  static fromJSON(v: string): Revision {
    return new Revision(JSON.parse(v).count);
  }
}
