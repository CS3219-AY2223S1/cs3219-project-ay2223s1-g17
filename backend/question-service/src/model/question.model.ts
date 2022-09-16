import mongoose from 'mongoose';
import { IQuestion, IQuestionModel } from './question.type';

const questionSchema = new mongoose.Schema<IQuestion, IQuestionModel>({
  title: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  examples: {
    type: [
      {
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
      difficulty: difficulty,
    };

    const count = await Question.countDocuments(query);

    if (count === 0) throw new Error('No Questions available, seed questions');

    const randomSkip = Math.floor(Math.random() * count);

    const question = await Question.findOne().skip(randomSkip);

    return question;
  }
);

const Question = mongoose.model<IQuestion, IQuestionModel>(
  'Question',
  questionSchema
);

export default Question;
