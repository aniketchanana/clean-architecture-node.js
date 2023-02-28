import express from "express";
import { userUrls } from "../../common/constants/routes";
import { TodoAppDataSource, IUserModel } from "../../data/interfaces";
import { Types } from "../../DiTypes";
import { dIContainer } from "../../inversify.config";
import { IUserController } from "./controller/user.controller";

import { UserService } from "./service/user.service";

// this place we define out routes which takes in use case as our parameter
export default function UserRouter(authMiddleWare) {
  const router = express.Router();

  const userControllerInstance = dIContainer.get<IUserController>(
    Types.USER_CONTROLLER
  );
  router.post(
    userUrls.signIn,
    userControllerInstance.signIn.bind(userControllerInstance)
  );
  router.post(
    userUrls.signUp,
    userControllerInstance.signUp.bind(userControllerInstance)
  );
  router.put(
    userUrls.logout,
    authMiddleWare,
    userControllerInstance.logOut.bind(userControllerInstance)
  );
  router.get(
    userUrls.isValidSession,
    authMiddleWare,
    userControllerInstance.isValidSession.bind(userControllerInstance)
  );
  return router;
}
