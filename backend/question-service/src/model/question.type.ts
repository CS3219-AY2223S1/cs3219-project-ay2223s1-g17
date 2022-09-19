import { Document, Model, Types } from 'mongoose';
import { DIFFICULTY, LANGUAGE } from '../../../utils';

export interface IQuestion {
  title: string;
  difficulty: DIFFICULTY;
  description: string;
  examples: IExample[];
  templates: ITemplate[];
  link: string;
}

interface IExample {
  index: number;
  input: string;
  output: string;
  explanation?: string;
}

interface ITemplate {
  language: LANGUAGE;
  starterCode: string;
}

export type QuestionDocument = Document<unknown, any, IQuestion> &
  IQuestion & { _id: Types.ObjectId } & IQuestionMethods;

export interface IQuestionMethods {}

export interface IQuestionModel extends Model<IQuestion, {}, IQuestionMethods> {
  findQuestionByDifficulty(difficulty: string): Promise<QuestionDocument>;
  findQuestionById(id: string): Promise<QuestionDocument>;
  findAllQuestions(): Promise<QuestionDocument[]>;
  seedQuestions(): Promise<QuestionDocument[]>;
}
