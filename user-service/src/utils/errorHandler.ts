import { Response } from 'express';
import { HttpStatusCode } from './HttpsStatusCode';
import { PeerPrepError } from './PeerPrepError';

/***
 * Standardized error handler for all routes
 *
 * @param res HTTP response from router
 * @param error Error from execution of controller logic
 */
export const errorHandler = (res: Response, error: unknown) => {
  return res
    .status(
      error instanceof PeerPrepError
        ? error.statusCode
        : HttpStatusCode.BAD_REQUEST
    )
    .json({ message: error instanceof Error ? error.message : error });
};
