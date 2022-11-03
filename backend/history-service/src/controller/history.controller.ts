import { assert } from 'console';
import { Request, Response } from 'express';
import {
  DIFFICULTY,
  errorHandler,
  LANGUAGE,
  successHandler,
  TOPIC,
} from '../../../utils';
import History from '../model/history.model';
import { IHistory } from '../model/history.types';
import Statistics from '../model/statistics.model';

export const getHistoryForUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    const history = await History.findHistoryByUser(userId);
    successHandler(res, history);
  } catch (error) {
    errorHandler(res, error);
  }
};

export const deleteHistoryForUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    await History.deleteHistoryByUser(userId);
    successHandler(res);
  } catch (error) {
    errorHandler(res, error);
  }
};

/**
 * Gets a History record based on its ID
 *
 * @param req Incoming HTTP request with history ID
 * @param res Outgoing HTTP response indicating success of history record retrieval
 */
export const getHistoryById = async (req: Request, res: Response) => {
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
export const addHistory = async (
  req: Request<
    {},
    {},
    {
      history: IHistory & {
        users: string[];
      };
    }
  >,
  res: Response
) => {
  try {
    const { history } = req.body;
    const {
      users,
      language,
      question: { id, difficulty, topics, title },
    } = history;

    assert(users.length === 2);

    const promises: Promise<void>[] = [];
    users.forEach((user, index) => {
      const historyToSave = {
        ...history,
        user,
        otherUser: users[Number(!index)],
      };
      const saveHistoryPromise = History.saveHistory(historyToSave);

      const safelyTypedQuestion = {
        id,
        title,
        language: language as LANGUAGE,
        difficulty: difficulty as DIFFICULTY,
        topics: topics as TOPIC[],
      };
      const updateStatisticsPromise = Statistics.updateStatisticsByUser(
        user,
        safelyTypedQuestion
      );

      promises.push(saveHistoryPromise, updateStatisticsPromise);
    });

    await Promise.all(promises);
    successHandler(res);
  } catch (error) {
    errorHandler(res, error);
  }
};
