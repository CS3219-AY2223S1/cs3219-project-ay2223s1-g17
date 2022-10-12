import { Request, Response, Router } from 'express';
import { addHistory, getHistory } from '../controller';

const router = Router();

router.get('/', (_: Request, res: Response) => {
  res.status(200).send('<h1>History Service</h1>');
});

router.route('/:id').get(getHistory);

router.route('/save').post(addHistory);

export default router;
