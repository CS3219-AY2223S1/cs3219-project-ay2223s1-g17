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

export type UserQueryOptions = {
  onlySelectIdentifiers?: boolean;
  onlySelectFriends?: boolean;
};

export interface IUserModel extends Model<IUser, {}, IUserMethods> {
  createUser(username: string, password: string): Promise<void>;
  findVerifiedUser(username: string, password: string): Promise<UserDocument>;
  findUserByUsername(
    username: string,
    options?: UserQueryOptions
  ): Promise<UserDocument>;
  findUserById(id: string, options?: UserQueryOptions): Promise<UserDocument>;
}
