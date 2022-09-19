import mongoose from 'mongoose';
import { DIFFICULTY } from '../../../utils';
import { QUESTIONS } from '../data';
import { IQuestion, IQuestionModel } from './question.type';

const questionSchema = new mongoose.Schema<IQuestion, IQuestionModel>({
  title: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: DIFFICULTY,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  examples: {
    type: [
      {
        index: {
          type: Number,
          required: true,
        },
        input: {
          type: String,
          required: true,
        },
        output: {
          type: String,
          required: true,
        },
        explanation: {
          type: String,
        },
      },
    ],
  },
  templates: {
    type: [
      {
        language: {
          type: String,
          required: true,
        },
        starterCode: {
          type: String,
          required: true,
        },
      },
    ],
  },
  link: {
    type: String,
    required: true,
  },
});

questionSchema.static(
  'findQuestionByDifficulty',
  /**
   * Attempts to find a Question randomly based on difficulty specified
   *
   * @param difficulty Difficulty of a Question
   */
  async function findQuestionByDifficulty(difficulty: string) {
    if (!difficulty) throw new Error('Difficulty is required');

    const query = {
      difficulty: difficulty.toUpperCase(),
    };

    const count = await Question.countDocuments(query);

    if (count === 0) throw new Error('No question found, seed questions');

    const randomSkip = Math.floor(Math.random() * count);

    const question = await Question.findOne().skip(randomSkip);

    return question;
  }
);

questionSchema.static(
  'seedQuestions',
  /**
   * Attempts to seed Question documents
   */
  async function seedQuestions() {
    await Question.deleteMany({});

    const res = await Question.create(QUESTIONS);

    return res;
  }
);

const Question = mongoose.model<IQuestion, IQuestionModel>(
  'Question',
  questionSchema
);

export default Question;
