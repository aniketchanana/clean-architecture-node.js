import { Container } from "inversify";
import { Types } from "./DiTypes";
import { IUserService, UserService } from "./modules/user/service/user.service";
import {
  IUserRepository,
  UserRepository,
} from "./modules/user/repository/user.repository";
import {
  UserController,
  IUserController,
} from "./modules/user/controller/user.controller";
import { TodoAppDataSource, ITodoModel, IUserModel } from "./data/interfaces";
import { UserTable } from "./data/tables/UserTable";
import ParametersService, {
  ITodoService,
} from "./modules/todos/service/todo.service";
import ParametersRepository, {
  ITodoRepository,
} from "./modules/todos/repository/todo.repository";
import {
  ITodoController,
  TodoController,
} from "./modules/todos/controller/todo.controller";
import { TodoTable } from "./data/tables/TodoTable";

const dIContainer = new Container();

// DB tables
dIContainer.bind<TodoAppDataSource<IUserModel>>(Types.USER_TABLE).to(UserTable);
dIContainer.bind<TodoAppDataSource<ITodoModel>>(Types.ToDo_TABLE).to(TodoTable);

// For auth service module
dIContainer.bind<IUserService>(Types.USER_SERVICE).to(UserService);
dIContainer.bind<IUserRepository>(Types.USER_REPOSITORY).to(UserRepository);
dIContainer.bind<IUserController>(Types.USER_CONTROLLER).to(UserController);

// For parameter service
dIContainer.bind<ITodoService>(Types.Todo_SERVICE).to(ParametersService);
dIContainer
  .bind<ITodoRepository>(Types.Todo_REPOSITORY)
  .to(ParametersRepository);
dIContainer.bind<ITodoController>(Types.Todo_CONTROLLER).to(TodoController);

export { dIContainer };
