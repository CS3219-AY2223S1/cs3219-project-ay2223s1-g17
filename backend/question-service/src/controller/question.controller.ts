import { Request, Response } from 'express';
import { errorHandler, successHandler } from '../../../utils';
import Question from '../model';

/**
 * Gets a Question based on difficulty randomly
 *
 * @param req Incoming HTTP request with difficulty
 * @param res Outgoing HTTP response indicating success of question retrieval
 */
export const getQuestionByDifficulty = async (req: Request, res: Response) => {
  try {
    const { difficulty } = req.params;
    const question = await Question.findQuestionByDifficulty(difficulty);

    successHandler(res, question);
  } catch (error) {
    errorHandler(res, error);
  }
};

/**
 * Seeds preloaded questions
 *
 * @param res Outgoing HTTP response indicating success of the seed
 */
export const loadQuestions = async (_: Request, res: Response) => {
  try {
    const questions = await Question.seedQuestions();

    successHandler(res, questions);
  } catch (error) {
    errorHandler(res, error);
  }
};
