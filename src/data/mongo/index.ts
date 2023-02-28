import { injectable, unmanaged } from "inversify";
import mongoose, { FilterQuery } from "mongoose";
import { DB_TABLES } from "../../common/constants/dbTables";
import { TodoAppDataSource, Projection } from "../interfaces";
import User from "./models/user.model";
import ToDo from "./models/todo.model";

const ALL_TABLES: { [key: string]: mongoose.Model<any> } = {
  [DB_TABLES.USER]: User,
  [DB_TABLES.TODO]: ToDo,
};
@injectable()
export class MongoDataSource<T> implements TodoAppDataSource<T> {
  private table: mongoose.Model<T>;
  constructor(@unmanaged() tableName: DB_TABLES) {
    this.table = ALL_TABLES[tableName] as mongoose.Model<T>;
  }

  public async findOne<T>(
    selectQuery: Partial<T>,
    project: Projection = {}
  ): Promise<T> {
    return this.table.findOne(selectQuery as FilterQuery<T>, project);
  }

  public async create<T>(data: T): Promise<T> {
    const newRecord = new this.table(data);
    return newRecord.save() as Promise<T>;
  }

  bulkInsert = (data: T[]): Promise<T[]> => {
    return this.table.insertMany(data);
  };

  public async findOneAndUpdate<T>(
    selectQuery: Partial<T>,
    updates: Partial<T>
  ): Promise<T> {
    return this.table.findOneAndUpdate(selectQuery as FilterQuery<T>, updates, {
      new: true,
    });
  }

  public findMany = async (
    filter: Partial<T>,
    project?: Projection
  ): Promise<Array<T>> => {
    const result = await this.table.find(filter as FilterQuery<T>, project);
    return result as unknown as Promise<Array<T>>;
  };
}
