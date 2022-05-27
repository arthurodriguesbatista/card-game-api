export class Page<T> {
  static EMPTY = Page.of([], 0);

  data: T[];
  count: number;

  constructor(data?: Partial<Page<T>>) {
    Object.assign(this, data);
  }

  static of<E>(data: E[], count: number) {
    return new Page<E>({
      data,
      count,
    });
  }

  map<D>(mapper: (entity: T) => D): Page<D> {
    return Page.of<D>(this.data.map(mapper), this.count);
  }

  async asyncMap<D>(mapper: (entity: T) => Promise<D>): Promise<Page<D>> {
    return Page.of<D>(await Promise.all(this.data.map(mapper)), this.count);
  }
}
