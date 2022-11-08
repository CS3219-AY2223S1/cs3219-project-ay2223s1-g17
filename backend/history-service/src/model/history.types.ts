import { LeanDocument, Model, Types } from 'mongoose';
import { LANGUAGE } from '../utils';

// Each user needs to have an array of history IDs associated
// to them.
export interface IHistory {
  user: string;
  otherUser: string;
  question: {
    id: string;
    title: string;
    difficulty: string;
    topics: string[];
  };
  code: string;
  language: string;
  chats: Chat[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ICompleteHistory extends Omit<IHistory, 'question'> {
  question: {
    id: string;
    title: string;
    difficulty: string;
    topics: string[];
    examples: string[];
    constraints: string[];
    templates: {
      language: LANGUAGE;
      starterCode: string;
    };
    description: string;
    link: string;
  };
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

export type CompleteHistoryDocument = LeanDocument<ICompleteHistory> &
  ICompleteHistory & { _id: Types.ObjectId } & IHistoryMethods;

export interface IHistoryModel extends Model<IHistory, {}, IHistoryMethods> {
  findHistoryById(id: string): Promise<HistoryDocument>;
  findCompleteHistoryById(id: string): Promise<CompleteHistoryDocument>;
  findHistoryByUser(userId: string): Promise<HistoryDocument[]>;
  deleteHistoryByUser(userId: string): Promise<void>;
  saveHistory(history: IHistory): Promise<void>;
}
