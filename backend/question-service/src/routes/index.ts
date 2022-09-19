import { Request, Response, Router } from 'express';
import {
  getQuestion,
  getQuestionByDifficulty,
  getQuestions,
  getQuestionsCount,
  loadQuestions,
} from '../controller';

const router = Router();

router.get('/', (_: Request, res: Response) => {
  res.status(200).send('<h1>Question Service</h1>');
});

router.route('/:id').get(getQuestion);

router.route('/get/difficulty/:difficulty').get(getQuestionByDifficulty);

router.route('/get/all').get(getQuestions);

router.route('/get/count').get(getQuestionsCount);

router.route('/seed').post(loadQuestions);

export default router;
