import { PopulatedDoc, Types, Model, Document } from 'mongoose';

export interface IUser {
  username: string;
  password: string;
  friends: PopulatedDoc<IUser>[];
}

export type UserDocument = Document<unknown, any, IUser> &
  IUser & {
    _id: Types.ObjectId;
  } & IUserMethods;

export interface IUserMethods {
  generateJwtToken(): string;
}

export interface IUserModel extends Model<IUser, {}, IUserMethods> {
  createUser(username: string, password: string): Promise<void>;
  findVerifiedUser(username: string, password: string): Promise<UserDocument>;
  findUserByUsername(username: string): Promise<UserDocument>;
  findUserById(id: string): Promise<UserDocument>;
  updateUserPasswordById(
    id: string,
    currentPassword: string,
    newPassword: string
  ): Promise<void>;
  deleteUserById(id: string): Promise<void>;
}
