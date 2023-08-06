export interface Repository<T> {
  result: () => Promise<T>;
}
