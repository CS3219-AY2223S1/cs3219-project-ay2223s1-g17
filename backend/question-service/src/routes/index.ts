import { Request, Response, Router } from 'express';
import {
  getQuestion,
  getQuestionByDifficulty,
  loadQuestions,
} from '../controller';

const router = Router();

router.get('/', (_: Request, res: Response) => {
  res.status(200).send('<h1>Question Service</h1>');
});

router.route('/get/:id').get(getQuestion);

router.route('/get/:difficulty').get(getQuestionByDifficulty);

router.route('/seed').post(loadQuestions);

export default router;
