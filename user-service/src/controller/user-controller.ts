import { Request, Response } from 'express';
import {
  ormCreateUser as _createUser,
  ormGetUserInfoFromToken as _getUserInfoFromToken,
  ormGetVerifiedUserAndToken as _getVerifiedUserAndToken,
} from '../model/user-orm';
import { errorHandler } from '../utils/errorHandler';
import { HttpStatusCode } from '../utils/HttpsStatusCode';

/**
 * Creates a new user with the given credentials
 *
 * @param req HTTP request from router
 * @param res HTTP response from router
 */
export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    await _createUser(username, password);
    res.sendStatus(HttpStatusCode.OK);
  } catch (error) {
    errorHandler(res, error);
  }
};

/**
 * Allows a user to log in if credentials are valid
 * and embeds a HttpOnly cookie in the response for
 * future authorization and authentication
 *
 * @param req HTTP request from router
 * @param res HTTP response from router
 */
export const logIn = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const { verifiedUser, token } = await _getVerifiedUserAndToken(
      username,
      password
    );

    res
      .cookie('token', token, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 1000 * 60 * 60 * 24,
      })
      .status(HttpStatusCode.OK)
      .json(verifiedUser);
  } catch (error) {
    errorHandler(res, error);
  }
};

/**
 * Logs out a user, if logged in, and removes the embedded
 * HttpOnly cookie
 *
 * @param req HTTP request from router
 * @param res HTTP response from router
 */
export const logOut = async (_: Request, res: Response) => {
  try {
    res.clearCookie('token').sendStatus(HttpStatusCode.OK);
  } catch (error) {
    errorHandler(res, error);
  }
};

/**
 * Fetches the information of a user given a
 * user id. User id will only exist if authentication
 * middleware successfully detected HttpOnly cookie'
 * embedded in request and decrypted the token in it
 *
 * @param req HTTP request from router
 * @param res HTTP response from router
 */
export const getUserInfoFromToken = async (req: Request, res: Response) => {
  const { userId } = req.body;

  const userInfo = await _getUserInfoFromToken(userId);

  res.status(HttpStatusCode.OK).json(userInfo);
};
