import { Document, Model, Types } from 'mongoose';
import { DIFFICULTY, LANGUAGE } from '../../../utils';

type Difficulty = DIFFICULTY;
type Language = LANGUAGE;

export interface IQuestion {
  title: string;
  difficulty: Difficulty;
  description: string;
  examples: IExample[];
  template: Record<Language, string>;
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
