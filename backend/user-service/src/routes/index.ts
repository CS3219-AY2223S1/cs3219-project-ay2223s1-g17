import { Request, Response, Router } from 'express';
import { login, logout, refreshUserInfoByToken, register } from '../controller';
import { authenticate } from '../middleware';
import { HttpStatusCode } from '../../../utils';

const router = Router();

router.get('/', (_: Request, res: Response) => {
  res.status(HttpStatusCode.OK).send('<h1>User Service</h1>');
});
// user service routes
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').post(logout);
router.route('/refresh').post(authenticate, refreshUserInfoByToken);

export default router;
