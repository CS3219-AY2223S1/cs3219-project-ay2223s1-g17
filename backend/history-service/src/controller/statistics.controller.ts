import { Request, Response } from 'express';
import { successHandler, errorHandler } from '../../../utils';
import Statistics from '../model/statistics.model';

export const createStatisticsForUser = async (req: Request, res: Response) => {
  const { userId } = req.body;
  console.log('uid: ', userId, req.body);
  const statistics = await Statistics.create({ user: userId });
  successHandler(res, statistics);
};

export const getStatisticsForUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    const statistics = await Statistics.getStatisticsByUser(userId);
    successHandler(res, statistics);
  } catch (error) {
    errorHandler(res, error);
  }
};

export const updateStatisticsForUser = async (req: Request, res: Response) => {
  try {
    const { userId, question } = req.body;

    await Statistics.updateStatisticsByUser(userId, question);
    successHandler(res);
  } catch (error) {
    errorHandler(res, error);
  }
};
