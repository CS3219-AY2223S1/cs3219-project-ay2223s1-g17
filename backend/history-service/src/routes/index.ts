import { Request, Response, Router } from 'express';
import {
  addHistory,
  deleteHistoryForUser,
  getCompleteHistoryById,
  getHistoryById,
  getHistoryForUser,
} from '../controller';
import {
  createStatisticsForUser,
  getStatisticsForUser,
} from '../controller/statistics.controller';

const router = Router();

router
  .route('/')
  .get((_: Request, res: Response) => {
    res.status(200).send('<h1>History Service</h1>');
  })
  .post(addHistory);

router.route('/:id').get(getHistoryById);

router.route('/complete/:id').get(getCompleteHistoryById);

router
  .route('/history/:userId')
  .get(getHistoryForUser)
  .delete(deleteHistoryForUser);

router
  .route('/stats/:userId')
  .get(getStatisticsForUser)
  .post(createStatisticsForUser);

export default router;
