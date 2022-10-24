import { LeanDocument, Model, Types } from 'mongoose';

// Each user needs to have an array of history IDs associated
// to them.
export interface IHistory {
  user: string;
  otherUser: string;
  question: {
    id: string;
    title: string;
    difficulty: string;
  };
  code: string;
  language: string;
  chats: Chat[];
  createdAt: Date;
  updatedAt: Date;
}

interface Chat {
  senderId: string;
  senderName: string;
  message: string;
  time: string;
}

export interface IHistoryMethods {}

export type HistoryDocument = LeanDocument<IHistory> &
  IHistory & { _id: Types.ObjectId } & IHistoryMethods;

export interface IHistoryModel extends Model<IHistory, {}, IHistoryMethods> {
  findHistoryById(id: string): Promise<HistoryDocument>;
  findHistoryByUser(userId: string): Promise<HistoryDocument[]>;
  deleteHistoryByUser(userId: string): Promise<void>;
  saveHistory(history: IHistory): Promise<void>;
}
