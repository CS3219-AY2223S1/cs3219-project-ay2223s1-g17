import { Request, Response } from 'express';
import { successHandler, errorHandler } from '../../../utils';
import Statistics from '../model/statistics.model';

export const createStatisticsForUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const statistics = await Statistics.create({ user: userId });
  successHandler(res, statistics);
};

export const getStatisticsForUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const statistics = await Statistics.getStatisticsByUser(userId);
    successHandler(res, statistics);
  } catch (error) {
    errorHandler(res, error);
  }
};
