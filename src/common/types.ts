import { Request } from "express";
import { IUserModel } from "../data/interfaces";

export interface GenericObject<K> {
  [key: string]: K;
}

export interface AuthenticatedRequest extends Request {
  user: IUserModel | null | undefined;
}
