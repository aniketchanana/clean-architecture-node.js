import { inject, injectable } from "inversify";
import shortid from "shortid";
import { TodoAppDataSource, ITodoModel } from "../../../data/interfaces";
import { Types } from "../../../DiTypes";

export interface ITodoRepository {
  createNewEntry: (content: string, userId: string) => Promise<ITodoModel>;
  getAllUserTodo: (userId: string) => Promise<Array<ITodoModel>>;
  deleteTodo: (userId: string, parameterId: string) => Promise<ITodoModel>;
  updateTodoDetails: (
    userId: string,
    todoId: string,
    todoDetails: Partial<ITodoModel>
  ) => Promise<ITodoModel>;
}

@injectable()
class TodoRepository implements ITodoRepository {
  @inject(Types.ToDo_TABLE)
  private todoTable: TodoAppDataSource<ITodoModel>;

  private getParameterObj = (
    content: string,
    userId: string
  ): Omit<ITodoModel, "_id"> => ({
    content,
    userId,
    isDeleted: false,
  });

  createNewEntry = async (
    content: string,
    userId: string
  ): Promise<ITodoModel> => {
    return this.todoTable.create(
      this.getParameterObj(content, userId) as ITodoModel
    );
  };

  getAllUserTodo = async (userId: string) => {
    return this.todoTable.findMany({ userId, isDeleted: false });
  };

  deleteTodo = async (userId: string, todoId: string): Promise<ITodoModel> => {
    return this.todoTable.findOneAndUpdate(
      {
        userId,
        _id: todoId,
      },
      {
        isDeleted: true,
      }
    );
  };

  updateTodoDetails = async (
    userId: string,
    todoId: string,
    todoDetails: Partial<ITodoModel>
  ): Promise<ITodoModel> => {
    return this.todoTable.findOneAndUpdate(
      {
        userId,
        _id: todoId,
        isDeleted: false,
      },
      {
        ...todoDetails,
      }
    );
  };
}

export default TodoRepository;
