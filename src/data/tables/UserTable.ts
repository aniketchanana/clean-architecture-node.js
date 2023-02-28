import { injectable } from "inversify";
import { MongoDataSource } from "../mongo";
import { DB_TABLES } from "../../common/constants/dbTables";
import { IUserModel } from "../interfaces";

@injectable()
export class UserTable extends MongoDataSource<IUserModel> {
  constructor() {
    super(DB_TABLES.USER);
  }
}
