import config from "../../config";
import { StatusCode } from "../common/constants/statusCode";
import { TodoAppDataSource, IUserModel } from "../data/interfaces";
import jwt from "jsonwebtoken";
import { dIContainer } from "../inversify.config";
import { Types } from "../DiTypes";

export const getAuthMiddleWare = () => {
  const userTable: TodoAppDataSource<IUserModel> = dIContainer.get<
    TodoAppDataSource<IUserModel>
  >(Types.USER_TABLE);

  return async (req, res, next) => {
    try {
      const token = req.cookies.access_token || req.headers.cookie;
      const decoded = jwt.verify(token, config.JWT) as { emailId: string };
      const user = await userTable.findOne({
        emailId: decoded.emailId,
        token: token,
      });
      if (!user) {
        throw new Error();
      }
      req.token = token;
      req.user = user;
    } catch (e) {
      return res
        .status(StatusCode.UN_AUTHORIZED)
        .send({ title: "Invalid user" });
    }
    next();
  };
};
