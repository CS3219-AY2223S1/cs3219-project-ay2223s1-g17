import { Request, Response, Router } from 'express';
import {
  addHistory,
  deleteHistoryForUser,
  getHistoryById,
  getHistoryForUser,
} from '../controller';
import {
  createStatisticsForUser,
  getStatisticsForUser,
  updateStatisticsForUser,
} from '../controller/statistics.controller';

const router = Router();

router.get('/', (_: Request, res: Response) => {
  res.status(200).send('<h1>History Service</h1>');
});

router.route('/:id').get(getHistoryById);
router.route('/get').post(getHistoryForUser);
router.route('/').post(addHistory).delete(deleteHistoryForUser);

router.route('/stats/create').post(createStatisticsForUser);
router.route('/stats').post(getStatisticsForUser).put(updateStatisticsForUser);

export default router;
