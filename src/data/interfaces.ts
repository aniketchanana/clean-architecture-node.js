export interface Projection {
  [key: string]: 1 | 0;
}
export interface IUserModel {
  _id: string;
  name: string;
  emailId: string;
  password: string;
  avatar?: string;
  token?: string;
}
export type IPublicUser = Omit<IUserModel, "password">;
export interface ITodoModel {
  _id: string;
  isDeleted: boolean;
  userId: string;
  content: string;
}
export interface TodoAppDataSource<T> {
  create(data: T): Promise<T>;
  bulkInsert(records: T[]): Promise<T[]>;
  findOne(filter: Partial<T>, project?: Projection): Promise<T>;
  findMany(filter: Partial<T>, project?: Projection): Promise<T[]>;
  findOneAndUpdate(filter: Partial<T>, updates: Partial<T>): Promise<T>;
}
