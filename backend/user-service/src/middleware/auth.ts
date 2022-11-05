import { NextFunction, Request, Response } from 'express';
import { errorHandler, HttpStatusCode, PeerPrepError } from '../../../utils';
import jwt, { JwtPayload } from 'jsonwebtoken';

/**
 * Middleware to authenticate a user.
 * A user is authenticated if token exists in
 * HttpOnly cookie embedded in request, which will
 * only be true if the user is logged in
 *
 * @param req Incoming HTTP request with the user's jwt token
 * @param res Outgoing HTTP response
 * @param next Next function to execute after middleware successfully terminates
 */
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bearerHeader = req.headers['authorization'];
    if (!bearerHeader)
      throw new PeerPrepError(
        HttpStatusCode.UNAUTHORIZED,
        'Authentication Required'
      );

    const bearer = bearerHeader.split(' ');
    if (bearer.length !== 2 || bearer[0] !== 'Bearer')
      throw new PeerPrepError(
        HttpStatusCode.UNAUTHORIZED,
        'Authentication Required'
      );

    const token = bearer[1];
    const user = jwt.verify(token, process.env.JWT_SECRET ?? '');
    req.body.userId = (user as JwtPayload)._id;
    next();
  } catch (error) {
    const errorName = (error as any).name;
    switch (errorName) {
      case 'TokenExpiredError':
        return errorHandler(
          res,
          new PeerPrepError(
            HttpStatusCode.LOGIN_TIMEOUT,
            'Your login session has expired, please re-login to continue'
          )
        );
      case 'JsonWebTokenError':
        return errorHandler(
          res,
          new PeerPrepError(
            HttpStatusCode.UNAUTHORIZED,
            'Unauthoized, please login to continue'
          )
        );
      default:
        errorHandler(res, error);
    }
  }
};

/**
 * Middleware to authorize a user.
 * A user is authorized if they are authenticated
 * and are only interacting with their own data
 *
 * @param req Incoming HTTP request with the user's jwt token
 * @param res Outgoing HTTP response
 * @param next Next function to execute after middleware successfully terminates
 */
export const authorize = (req: Request, res: Response, next: NextFunction) => {
  try {
    authenticate(req, res, () => {
      const { userId } = req.params;
      if (userId !== req.body.userId)
        throw new PeerPrepError(
          HttpStatusCode.FORBIDDEN,
          'Authorization Required'
        );
      next();
    });
  } catch (error) {
    errorHandler(res, error);
  }
};
