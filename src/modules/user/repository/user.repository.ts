import { inject, injectable } from "inversify";
import {
  TodoAppDataSource,
  IPublicUser,
  IUserModel,
} from "../../../data/interfaces";
import { Types } from "../../../DiTypes";

export interface IUserRepository {
  createNewUser: (userDetails: Omit<IUserModel, "_id">) => Promise<IPublicUser>;
  getUserByEmail: (emailId: string) => Promise<IUserModel>;
  updateExistingUserDetails: (
    userId: string,
    updates: Partial<IUserModel>
  ) => Promise<IPublicUser>;
}
@injectable()
export class UserRepository implements IUserRepository {
  @inject(Types.USER_TABLE) private userTable: TodoAppDataSource<IUserModel>;

  private getPublicUserProfile(user: IUserModel): IPublicUser {
    return {
      _id: user._id,
      name: user.name,
      emailId: user.emailId,
      token: user.token,
    };
  }
  public async createNewUser(userDetails: Omit<IUserModel, "_id">) {
    try {
      const newUserDetails = await this.userTable.create(
        userDetails as IUserModel
      );
      const publicUserDetails = this.getPublicUserProfile(newUserDetails);
      return publicUserDetails;
    } catch (e) {
      throw new Error("Unable to create user");
    }
  }

  public async getUserByEmail(emailId: string) {
    const user = await this.userTable.findOne({ emailId });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  public async updateExistingUserDetails(
    userId: string,
    updates: Partial<IUserModel>
  ): Promise<IPublicUser> {
    try {
      const updatedUserDetails = await this.userTable.findOneAndUpdate(
        {
          _id: userId,
        },
        updates
      );
      return this.getPublicUserProfile(updatedUserDetails);
    } catch (e) {
      throw new Error("Unable to sign in");
    }
  }
}
