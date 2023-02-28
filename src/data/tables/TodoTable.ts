import { injectable } from "inversify";
import { DB_TABLES } from "../../common/constants/dbTables";
import { ITodoModel } from "../interfaces";
import { MongoDataSource } from "../mongo";

@injectable()
export class TodoTable extends MongoDataSource<ITodoModel> {
  constructor() {
    super(DB_TABLES.TODO);
  }
}
