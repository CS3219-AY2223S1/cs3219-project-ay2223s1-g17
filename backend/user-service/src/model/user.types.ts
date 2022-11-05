import { Types, Model, Document } from 'mongoose';
import { LANGUAGE } from '../utils';

export interface IUser {
  username: string;
  password: string;
  preferredLanguage: LANGUAGE;
  // avatarImage: string;
}

export type UserDocument = Document<unknown, any, IUser> &
  IUser & {
    _id: Types.ObjectId;
  } & IUserMethods;

export interface IUserMethods {
  generateJwtToken(): string;
}

export interface IUserModel extends Model<IUser, {}, IUserMethods> {
  createUser(
    username: string,
    password: string,
    preferredLanguage: LANGUAGE
  ): Promise<void>;
  findVerifiedUser(username: string, password: string): Promise<UserDocument>;
  findUserByUsername(username: string): Promise<UserDocument>;
  findUserById(id: string): Promise<UserDocument>;
  updateUserPasswordById(
    id: string,
    currentPassword: string,
    newPassword: string
  ): Promise<void>;
  updateUserPreferredLanguageById(
    id: string,
    preferredLanguage: LANGUAGE
  ): Promise<void>;
  deleteUserById(id: string): Promise<void>;
}
