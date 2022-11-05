import { LeanDocument, Model, Types } from 'mongoose';
import { DIFFICULTY, LANGUAGE, TOPIC } from '../utils';

export interface IQuestion {
  title: string;
  difficulty: DIFFICULTY;
  description: string;
  topics: TOPIC[];
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

export type QuestionDocument = LeanDocument<IQuestion> &
  IQuestion & { _id: Types.ObjectId } & IQuestionMethods;

export type FormattedQuestionDocument = LeanDocument<
  Omit<IQuestion, 'templates'>
> & { templates: Record<string, string> };

export interface IQuestionMethods {}

export interface IQuestionModel extends Model<IQuestion, {}, IQuestionMethods> {
  findQuestionsByDifficulty(
    difficulty: DIFFICULTY,
    numQuestions?: number
  ): Promise<FormattedQuestionDocument>;
  findQuestionById(id: string): Promise<QuestionDocument>;
  findAllQuestions(): Promise<QuestionDocument[]>;
  findNumberOfQuestions(): Promise<Number>;
  seedQuestions(): Promise<QuestionDocument[]>;
}
