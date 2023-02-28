import mongoose from "mongoose";
import { DB_TABLES } from "../../../common/constants/dbTables";
import { ITodoModel } from "../../interfaces";

const todoSchema = new mongoose.Schema<ITodoModel>(
  {
    userId: {
      type: String,
      required: true,
      ref: DB_TABLES.USER,
    },
    content: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const ToDo = mongoose.model<ITodoModel>(DB_TABLES.TODO, todoSchema);

export default ToDo;
