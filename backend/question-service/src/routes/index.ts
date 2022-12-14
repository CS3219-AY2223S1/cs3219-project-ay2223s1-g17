import { Request, Response, Router } from 'express';
import {
  getQuestion,
  getQuestionByDifficulty,
  getQuestions,
  getQuestionsCount,
  getQuestionsCountByDifficulty,
  loadQuestions,
} from '../controller';

const router = Router();

router.get('/', (_: Request, res: Response) => {
  res.status(200).send('<h1>Hello World from Question Service</h1>');
});

router.route('/difficulty/:difficulty').get(getQuestionByDifficulty);
router.route('/all').get(getQuestions);
router.route('/count').get(getQuestionsCount);
router.route('/count/difficulty').get(getQuestionsCountByDifficulty);
router.route('/:id').get(getQuestion);
router.route('/seed').post(loadQuestions);

export default router;
