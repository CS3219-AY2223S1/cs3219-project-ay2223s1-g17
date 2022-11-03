import { Request, Response, Router } from 'express';
import {
  changePassword,
  changePreferredLanguage,
  deleteAccount,
  login,
  logout,
  refreshUserInfoByToken,
  register,
} from '../controller';
import { authenticate } from '../middleware';
import { HttpStatusCode } from '../../../utils';

const router = Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').post(authenticate, logout);
router.route('/refresh').post(authenticate, refreshUserInfoByToken);
router
  .route('/')
  .get((_: Request, res: Response) => {
    res.status(HttpStatusCode.OK).send('<h1>User Service</h1>');
  })
  .put(authenticate, changePassword)
  .delete(authenticate, deleteAccount);
router.route('/language').put(authenticate, changePreferredLanguage);

export default router;
