import { NextFunction, Request, Response } from 'express';
import { errorHandler } from '../utils/errorHandler';
import { HttpStatusCode } from '../utils/HttpsStatusCode';
import { PeerPrepError } from '../utils/PeerPrepError';
import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate a user.
 * A user is authenticated if token exists in
 * HttpOnly cookie embedded in request, which will
 * only be true if the user is logged in
 *
 * @param req HTTP request from router
 * @param res HTTP response from router
 * @param next Next function to execute after middleware successfully terminates
 */
export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;

    if (!token)
      throw new PeerPrepError(
        HttpStatusCode.UNAUTHENTICATED,
        'You are not authenticated'
      );

    const userId = jwt.verify(token, process.env.JWT_SECRET ?? '');
    req.body.userId = userId;
    next();
  } catch (error) {
    errorHandler(res, error);
  }
};
