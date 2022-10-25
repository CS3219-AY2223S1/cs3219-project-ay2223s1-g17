import { Document, Model, Types } from 'mongoose';
import { LANGUAGE, DIFFICULTY } from '../../../utils';

export type Question = {
  id: string;
  language: LANGUAGE;
  difficulty: DIFFICULTY;
  topics?: string[];
};

export interface IStatistics {
  user: string;
  completedQuestions: string[];
  completedQuestionsByDifficulty: Map<string, number>;
  completedTopics: Map<string, number>;
  completedQuestionsByDay: Map<string, number>;
  languagesUsed: Map<string, number>;
  dailyStreak: number;
  longestStreak: number;
}

export interface IStatisticsMethods {}

export type StatisticsDocument = Document<IStatistics> &
  IStatistics & { _id: Types.ObjectId } & IStatisticsMethods;

export interface IStatisticsModel
  extends Model<IStatistics, {}, IStatisticsMethods> {
  getStatisticsByUser(userId: string): Promise<StatisticsDocument>;
  updateStatisticsByUser(userId: string, question: Question): Promise<void>;
}
