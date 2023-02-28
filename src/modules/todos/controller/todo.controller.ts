import { Response } from "express";
import { inject, injectable } from "inversify";
import { StatusCode } from "../../../common/constants/statusCode";
import { AuthenticatedRequest } from "../../../common/types";
import { Types } from "../../../DiTypes";
import { ITodoService } from "../service/todo.service";
import {
  validateCreateNewTodoRequest,
  validateDeleteToDoRequest,
  validateUpdateToDoRequest,
} from "./reqValidations";

export interface ITodoController {
  getAllTodo: (req: AuthenticatedRequest, res: Response) => Promise<Response>;
  createNewTodo: (
    req: AuthenticatedRequest,
    res: Response
  ) => Promise<Response>;
  updateTodo: (req: AuthenticatedRequest, res: Response) => Promise<Response>;
  deleteTodo: (req: AuthenticatedRequest, res: Response) => Promise<Response>;
}

@injectable()
export class TodoController implements ITodoController {
  @inject(Types.Todo_SERVICE)
  private todoService: ITodoService;

  public createNewTodo = async (req: AuthenticatedRequest, res: Response) => {
    const validationRes = validateCreateNewTodoRequest(req.body);
    if (!validationRes.valid) {
      return res.status(StatusCode.BAD_REQUEST).json({
        title: validationRes.errors[0].message,
        description: "Invalid request body",
      });
    }

    try {
      const { content } = req.body;
      const todo = await this.todoService.createNewTodo(content, req.user._id);
      res.status(StatusCode.SUCCESS).json({
        title: "Created new todo success",
        todo,
      });
    } catch (e) {
      res.status(StatusCode.SERVER_ERROR).json({
        title: e.message,
      });
    }
  };

  public getAllTodo = async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<Response> => {
    try {
      const allUserTodo = await this.todoService.getAllTodo(req.user._id);
      return res.status(StatusCode.SUCCESS).json({ parameters: allUserTodo });
    } catch (e) {
      res.status(StatusCode.SERVER_ERROR).json({
        title: "Something went wrong",
      });
    }
  };

  public updateTodo = async (req: AuthenticatedRequest, res: Response) => {
    const { body } = req;
    const validatorRes = validateUpdateToDoRequest(body);
    if (!validatorRes.valid) {
      return res.status(StatusCode.BAD_REQUEST).send("Invalid request body");
    }

    try {
      const { todoId, content } = body;
      const updatedTodo = await this.todoService.updateTodo(
        req.user._id,
        todoId,
        content
      );
      return res.status(StatusCode.SUCCESS).json({
        title: "success",
      });
    } catch (e) {
      return res.status(StatusCode.SERVER_ERROR).json({
        title: e.message,
      });
    }
  };
  public deleteTodo = async (req: AuthenticatedRequest, res: Response) => {
    const { body } = req;
    const validatorRes = validateDeleteToDoRequest(body);
    if (!validatorRes.valid) {
      return res.status(StatusCode.BAD_REQUEST).json({
        title: "Invalid request body",
      });
    }
    try {
      const { todoId } = body;
      await this.todoService.deleteParameter(req.user._id, todoId);
      return res.status(StatusCode.SUCCESS).json({
        title: "success",
      });
    } catch (e) {
      return res.status(StatusCode.SERVER_ERROR).json({
        title: e.message,
      });
    }
  };
}
