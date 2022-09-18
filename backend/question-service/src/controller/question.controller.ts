import { Request, Response } from 'express';
import { errorHandler, successHandler } from '../../../utils';
import Question from '../model';

/**
 * Gets a Question based on difficulty randomly
 *
 * @param req Incoming HTTP request with difficulty
 * @param res Outgoing HTTP response indicating success of question retrieval
 */
export const getQuestion = async (req: Request, res: Response) => {
  try {
    const { difficulty } = req.params;
    const question = await Question.findQuestionByDifficulty(difficulty);

    successHandler(res, question);
  } catch (error) {
    errorHandler(res, error);
  }
};
