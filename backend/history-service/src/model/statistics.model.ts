import { model, Schema } from 'mongoose';
import { HttpStatusCode, PeerPrepError } from '../../../utils';
import { IStatistics, IStatisticsModel, Question } from './statistics.types';

const statisticsSchema = new Schema<IStatistics, IStatisticsModel>({
  user: {
    type: String,
    required: true,
    unique: true,
  },
  completedQuestions: [
    {
      type: String,
      default: [],
    },
  ],
  completedQuestionsByDifficulty: {
    type: Map,
    of: Number,
    default: new Map<string, number>(),
  },
  languagesUsed: {
    type: Map,
    of: Number,
    default: new Map<string, number>(),
  },
  completedQuestionsByDay: {
    type: Map,
    of: Number,
    default: new Map<string, number>(),
  },
  completedTopics: {
    type: Map,
    of: Number,
    default: new Map<string, number>(),
  },
  dailyStreak: {
    type: Number,
    default: 0,
  },
});

statisticsSchema.pre('save', async function (callback) {
  const statistics = this;

  if (!statistics.isNew && statistics.isModified('languagesUsed')) {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 0);
    const timeSinceStartOfYear = now.getTime() - startOfYear.getTime();
    const oneDayInMilliseconds = 1000 * 60 * 60 * 24;
    const dayOfYear = String(
      Math.floor(timeSinceStartOfYear / oneDayInMilliseconds)
    );

    const completedQuestionsToday =
      statistics.completedQuestionsByDay.get(dayOfYear) ?? 0;
    const completedQuestionsYesterday =
      statistics.completedQuestionsByDay.get(String(parseInt(dayOfYear) - 1)) ??
      0;

    if (completedQuestionsYesterday && !completedQuestionsToday)
      statistics.dailyStreak += 1;
    statistics.completedQuestionsByDay.set(
      dayOfYear,
      completedQuestionsToday + 1
    );
  }

  callback();
});

statisticsSchema.static(
  'getStatisticsByUser',
  async function getStatisticsByUser(userId: string) {
    if (!userId) throw new Error('User id is required');

    const statistics = Statistics.findOne({ user: userId }).sort({
      languagesUsed: 'desc',
    });
    if (!statistics)
      throw new PeerPrepError(
        HttpStatusCode.NOT_FOUND,
        'No statistics found for this user'
      );

    return statistics;
  }
);

statisticsSchema.static(
  'updateStatisticsByUser',
  async function updateStatisticsByUser(
    userId: string,
    completedQuestion: Question
  ) {
    if (!userId) throw new Error('User id is required');

    const statistics = await Statistics.getStatisticsByUser(userId);

    const { id, difficulty, language, topics } = completedQuestion;

    statistics.languagesUsed.set(
      language,
      (statistics.languagesUsed.get(language) ?? 0) + 1
    );

    if (topics && topics.length) {
      topics.forEach((topic) => {
        statistics.completedTopics.set(
          topic,
          (statistics.completedTopics.get(topic) ?? 0) + 1
        );
      });
    }

    if (!statistics.completedQuestions.includes(id)) {
      statistics.completedQuestions.push(id);
      statistics.completedQuestionsByDifficulty.set(
        difficulty,
        (statistics.completedQuestionsByDifficulty.get(difficulty) ?? 0) + 1
      );
    }

    await statistics.save();
  }
);

const Statistics = model<IStatistics, IStatisticsModel>(
  'Statistics',
  statisticsSchema
);

export default Statistics;
