import mongoose from 'mongoose';
import { DIFFICULTY, LANGUAGE, SKILL, TOPIC } from '../../../utils';
import { QUESTIONS } from '../data';
import {
  FormattedQuestionedDocument,
  IQuestion,
  IQuestionModel,
  QuestionDocument,
} from './question.type';

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
  topics: {
    type: [
      {
        skill: {
          type: String,
          enum: SKILL,
          required: true,
        },
        topics: { type: [String], enum: TOPIC },
      },
    ],
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

/**
 * Gets number of documents in Question collection
 *
 * @returns Number of questions
 */
const getQuestionsCount = async () => {
  return await Question.countDocuments();
};

questionSchema.static(
  'findQuestionsByDifficulty',
  /**
   * Attempts to find some number of Question(s) randomly based on difficulty specified
   *
   * @param difficulty Difficulty of a Question
   * @param numQuestions Number of Questions to find, defaults to 2
   */
  async function findQuestionsByDifficulty(
    difficulty: DIFFICULTY,
    numQuestions: number = 2
  ) {
    if (!difficulty) throw new Error('Difficulty is required');

    const count = await getQuestionsCount();

    if (count === 0) throw new Error('No question found, seed questions');

    const questions = await Question.aggregate([
      { $match: { difficulty } },
      { $sample: { size: numQuestions } },
    ]);

    return questions.map((question) => formatQuestion(question));
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

    return formatQuestion(question);
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

questionSchema.static('findNumberOfQuestions', getQuestionsCount);

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

const formatQuestion = (
  question: QuestionDocument
): FormattedQuestionedDocument => {
  const templatesMap = new Map<LANGUAGE, string>();
  question.templates.forEach((template) =>
    templatesMap.set(template.language, template.starterCode)
  );
  const templates = Object.fromEntries(templatesMap);
  return { ...question, templates };
};

const Question = mongoose.model<IQuestion, IQuestionModel>(
  'Question',
  questionSchema
);

export default Question;
