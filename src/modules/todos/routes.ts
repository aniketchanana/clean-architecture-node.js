import express from "express";
import { Types } from "../../DiTypes";
import { dIContainer } from "../../inversify.config";
import { ITodoController } from "./controller/todo.controller";

export default function TodoRoutes() {
  const router = express.Router();
  const todoController = dIContainer.get<ITodoController>(
    Types.Todo_CONTROLLER
  );

  router
    .route("/")
    .post(todoController.createNewTodo)
    .get(todoController.getAllTodo)
    .patch(todoController.updateTodo)
    .delete(todoController.deleteTodo);

  return router;
}
