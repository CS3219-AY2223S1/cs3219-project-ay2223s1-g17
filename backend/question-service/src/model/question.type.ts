import { Document, Model, Types } from 'mongoose';

export interface IQuestion {
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  descrption: string;
  examples: IExample[];
  link: string;
}

interface IExample {
  input: string;
  output: string;
  explanation?: string;
}

export type QuestionDocument = Document<unknown, any, IQuestion> &
  IQuestion & { _id: Types.ObjectId } & IQuestionMethods;

export interface IQuestionMethods {}

export interface IQuestionModel extends Model<IQuestion, {}, IQuestionMethods> {
  findQuestionByDifficulty(difficulty: string): Promise<QuestionDocument>;
}
