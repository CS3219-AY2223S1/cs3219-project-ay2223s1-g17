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

    const count = await getQuestionsCount();

    if (count === 0) throw new Error('No question found, seed questions');

    const query = { difficulty: difficulty.toUpperCase() };

    const question = await Question.aggregate([
      { $match: query },
      { $sample: { size: 1 } },
    ]);

    return question;
  }
);

questionSchema.static(
  'findQuestionById',
  /**
   * Attempts to find a Question by ID
   *
   * @param id id of a Question
   */
  async function findQuestionById(id: string) {
    if (!id) throw new Error('Question id is required');

    const count = await getQuestionsCount();

    if (count === 0) throw new Error('No question found, seed questions');

    const question = await Question.findById(id);

    if (!question) throw new Error(`No question with id ${id} found`);

    return question;
  }
);

questionSchema.static(
  'findAllQuestions',
  /**
   * Attempts to find all questions
   */
  async function findAllQuestions() {
    const count = await getQuestionsCount();

    if (count === 0) throw new Error('No question found, seed questions');

    const questions = await Question.find({});

    return questions;
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

/**
 * Gets number of documents in Question collection
 *
 * @returns Number of questions
 */
const getQuestionsCount = async () => {
  return await Question.countDocuments();
};

const Question = mongoose.model<IQuestion, IQuestionModel>(
  'Question',
  questionSchema
);

export default Question;
