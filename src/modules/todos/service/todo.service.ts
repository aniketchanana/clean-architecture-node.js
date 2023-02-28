import { inject, injectable } from "inversify";
import { ITodoModel } from "../../../data/interfaces";
import { Types } from "../../../DiTypes";
import { ITodoRepository } from "../repository/todo.repository";

export interface ITodoService {
  createNewTodo: (todoName: string, userId: string) => Promise<ITodoModel>;
  getAllTodo: (userId: string) => Promise<Array<ITodoModel>>;
  updateTodo: (
    userId: string,
    todoId: string,
    content: string
  ) => Promise<ITodoModel>;
  deleteParameter: (userId: string, parameterId: string) => Promise<ITodoModel>;
}

@injectable()
class TodoService implements ITodoService {
  @inject(Types.Todo_REPOSITORY)
  private todoRepository: ITodoRepository;

  createNewTodo = async (
    content: string,
    userId: string
  ): Promise<ITodoModel> => {
    try {
      return this.todoRepository.createNewEntry(content, userId);
    } catch (e) {
      throw new Error("Unable to create new todo");
    }
  };

  getAllTodo = async (userId: string): Promise<Array<ITodoModel>> => {
    try {
      return this.todoRepository.getAllUserTodo(userId);
    } catch {
      throw new Error("Unable to get user todo");
    }
  };

  updateTodo = async (
    userId: string,
    todoId: string,
    content: string
  ): Promise<ITodoModel> => {
    try {
      return this.todoRepository.updateTodoDetails(userId, todoId, {
        content,
      });
    } catch {
      throw new Error("Unable to updated todo");
    }
  };

  deleteParameter = async (
    userId: string,
    todoId: string
  ): Promise<ITodoModel> => {
    try {
      return this.todoRepository.deleteTodo(userId, todoId);
    } catch {
      throw new Error("Unable to delete todo");
    }
  };
}

export default TodoService;
