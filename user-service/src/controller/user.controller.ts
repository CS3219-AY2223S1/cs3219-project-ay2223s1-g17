import { Request, Response } from 'express';
import User from '../model';
import { errorHandler, successHandler } from '../utils';

/**
 * Creates a new user
 *
 * @param req Incoming HTTP request with the user's credentials
 * @param res Outgoing HTTP response indicating success of user creation
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    await User.createUser(username, password);
    successHandler(res);
  } catch (error) {
    errorHandler(res, error);
  }
};

/**
 * Attempts to login a user and authorizes the user if successful
 *
 * @param req Incoming HTTP request with the user's credentials
 * @param res Outgoing HTTP response indicating success of user login
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const verifiedUser = await User.findVerifiedUser(username, password);
    const jwtToken = verifiedUser.generateJwtToken();
    successHandler(res, verifiedUser, { setToken: jwtToken });
  } catch (error) {
    errorHandler(res, error);
  }
};

/**
 * Attempts to log out a user and un-authorizes the user if successful
 *
 * @param req Incoming HTTP request with the user's jwt token
 * @param res Outgoing HTTP response indicating success of user logout
 */
export const logout = async (_: Request, res: Response) => {
  try {
    successHandler(res, null, { clearToken: true });
  } catch (error) {
    errorHandler(res, error);
  }
};

/**
 * Fetches the data of a user via the user's jwt token
 *
 * @param req Incoming HTTP request with the user's jwt token
 * @param res Outgoing HTTP response containing the user's data
 */
export const refreshUserInfoByToken = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const { _id } = await User.findUserById(userId, {
      onlySelectIdentifiers: true,
    });
    successHandler(res, { _id });
  } catch (error) {
    errorHandler(res, error);
  }
};

/**
 * Fetches the friends list of a user via the user's jwt token
 *
 * @param req Incoming HTTP request with the user's jwt token
 * @param res Outgoing HTTP response containing the user's friends list
 */
export const fetchFriendsListByToken = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const { friends } = await User.findUserById(userId, {
      onlySelectFriends: true,
    });
    successHandler(res, friends);
  } catch (error) {
    errorHandler(res, error);
  }
};
