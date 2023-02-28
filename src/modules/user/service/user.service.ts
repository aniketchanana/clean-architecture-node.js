import { IUserRepository } from "../repository/user.repository";
import jwt from "jsonwebtoken";
import config from "../../../../config";
import { sha256Encryption } from "../../../utils/encryption";
import { isEqual } from "lodash";
import { IPublicUser } from "../../../data/interfaces";
import { inject, injectable } from "inversify";
import { Types } from "../../../DiTypes";
export interface IUserService {
  createUserAndGenerateAuthToken: (
    name: string,
    emailId: string,
    password: string
  ) => Promise<IPublicUser>;
  signInUser: (emailId: string, password: string) => Promise<IPublicUser>;
  clearUserAuthToken: (userId: string) => Promise<void>;
}

@injectable()
export class UserService implements IUserService {
  @inject(Types.USER_REPOSITORY) private userRepository: IUserRepository;

  private generateFreshAuthToken(emailId: string): string {
    return jwt.sign({ emailId: emailId.toString() }, config.JWT, {
      expiresIn: Math.floor(Date.now()) + 1000 * 60 * 60 * 24 * 30, // 30 days
    });
  }

  private verifyPassword(
    incomingPlacePass: string,
    existingEncryptedPass: string
  ): boolean {
    return isEqual(sha256Encryption(incomingPlacePass), existingEncryptedPass);
  }

  public async createUserAndGenerateAuthToken(
    name: string,
    emailId: string,
    password: string
  ): Promise<IPublicUser> {
    const token = this.generateFreshAuthToken(emailId);
    const encryptedPassword = sha256Encryption(password);

    const newUser = await this.userRepository.createNewUser({
      name,
      emailId,
      password: encryptedPassword,
      token,
    });

    return newUser;
  }

  public async signInUser(emailId: string, password: string) {
    const tempUser = await this.userRepository.getUserByEmail(emailId);
    if (!tempUser) {
      throw new Error("Unable to sign in");
    }
    const isMatch = this.verifyPassword(password, tempUser.password);
    if (!isMatch) {
      throw new Error("Unable to sign in");
    }

    const newToken = this.generateFreshAuthToken(emailId);
    return await this.userRepository.updateExistingUserDetails(tempUser._id, {
      token: newToken,
    });
  }

  public async clearUserAuthToken(userId: string) {
    await this.userRepository.updateExistingUserDetails(userId, {
      token: "",
    });
  }
}
