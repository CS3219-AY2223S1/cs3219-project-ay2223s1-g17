import { LeanDocument, Model, Types } from 'mongoose';

// Each user needs to have an array of history IDs associated
// to them.
export interface IHistory {
  user: string;
  questionId: string;
  code: string;
  chats: Chat[];
  createdAt: Date;
  updatedAt: Date;
}

// Add timestamp?
interface Chat {
  sender: string; // userId
  message: string;
}

export interface IHistoryMethods {}

export type HistoryDocument = LeanDocument<IHistory> &
  IHistory & { _id: Types.ObjectId } & IHistoryMethods;

export interface IHistoryModel extends Model<IHistory, {}, IHistoryMethods> {
  findHistoryById(id: string): Promise<HistoryDocument>;
  saveHistory(history: IHistory): Promise<HistoryDocument>;
}
