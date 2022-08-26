import { Router } from 'express';
import {
  createUser,
  getUserInfoFromToken,
  logIn,
  logOut,
} from '../controller/user-controller';
import { authenticateUser } from '../middleware/authenticateUser';

const router = Router();

// user service routes
router.route('/create').post(createUser);
router.route('/log-in').post(logIn);
router.route('/log-out').post(authenticateUser, logOut);
router.route('/info').get(authenticateUser, getUserInfoFromToken);

export default router;
