import { Request, Response } from 'express';
import { errorHandler, successHandler } from '../../../utils';
import History from '../model/history.model';

/**
 * Gets a History record based on its ID
 *
 * @param req Incoming HTTP request with history ID
 * @param res Outgoing HTTP response indicating success of history record retrieval
 */
export const getHistory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const history = await History.findHistoryById(id);

    successHandler(res, history);
  } catch (error) {
    errorHandler(res, error);
  }
};

/**
 * Adds a history record with the provided data
 *
 * @param req Incoming HTTP request with history data object
 * @param res Outgoing HTTP response indicating success of saving history data
 */
export const addHistory = async (req: Request, res: Response) => {
  try {
    const { history } = req.body;

    const historyId = await History.saveHistory(history);

    successHandler(res, historyId);
  } catch (error) {
    errorHandler(res, error);
  }
};
