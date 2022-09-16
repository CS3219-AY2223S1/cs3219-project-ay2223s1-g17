import { Document, Model, Types } from 'mongoose';
import { DIFFICULTY } from '../../../utils';

export interface IQuestion {
  title: string;
  difficulty: DIFFICULTY;
  description: string;
  examples: IExample[];
  template: ITemplate;
  link: string;
}

interface IExample {
  input: string;
  output: string;
  explanation?: string;
}

interface ITemplate {
  python: string;
}

export type QuestionDocument = Document<unknown, any, IQuestion> &
  IQuestion & { _id: Types.ObjectId } & IQuestionMethods;

export interface IQuestionMethods {}

export interface IQuestionModel extends Model<IQuestion, {}, IQuestionMethods> {
  findQuestionByDifficulty(difficulty: string): Promise<QuestionDocument>;
}
