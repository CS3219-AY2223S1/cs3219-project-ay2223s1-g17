import { Response } from 'express';
import HttpStatusCode from './httpStatusCode';
import PeerPrepError from './peerPrepError';

type SuccessfulResponseOptions =
  | { clearToken: boolean; setToken?: never }
  | { setToken: string; clearToken?: never };

/**
 * Standardized success handler for all routes
 *
 * @param res Incoming HTTP request
 * @param body Data to be sent back by outgoing HTTP response
 */
export const successHandler = (
  res: Response,
  body?: any,
  options?: SuccessfulResponseOptions
) => {
  if (options?.clearToken) {
    return res
      .clearCookie('token')
      .status(HttpStatusCode.OK)
      .json(body ?? {});
  } else if (options?.setToken) {
    return res
      .cookie('token', options.setToken, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'test' ? 'lax' : 'none',
        secure: process.env.NODE_ENV !== 'test',
        maxAge: 1000 * 60 * 60 * 24,
      })
      .status(HttpStatusCode.OK)
      .json(body ?? {});
  } else {
    return res.status(HttpStatusCode.OK).json(body ?? {});
  }
};

/**
 * Standardized error handler for all routes
 *
 * @param res Incoming HTTP request
 * @param error Error from execution of controller logic
 */
export const errorHandler = (res: Response, error: unknown) => {
  return res
    .status(
      error instanceof PeerPrepError
        ? error.statusCode
        : HttpStatusCode.BAD_REQUEST
    )
    .json({ error: error instanceof Error ? error.message : error });
};
