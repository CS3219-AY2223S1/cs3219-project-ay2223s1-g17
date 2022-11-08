import { Response } from 'express';
import mongoose from 'mongoose';
import HttpStatusCode from './httpStatusCode';
import PeerPrepError from './peerPrepError';

export const successHandler = (res: Response, body?: any) => {
  return res.status(HttpStatusCode.OK).json(body ?? {});
};

/**
 * Standardized error handler for all routes
 *
 * @param res Incoming HTTP request
 * @param error Error from execution of controller logic
 */
export const errorHandler = (res: Response, error: unknown) => {
  const errorMessage =
    error instanceof Error
      ? error.name === 'ValidationError'
        ? Object.values((error as mongoose.Error.ValidationError).errors).map(
            (val) => val.message
          )
        : error.name === 'MongoServerError' && (error as any).code == 11000
        ? Object.entries((error as any).keyValue)[0]
            .join(' ')
            .charAt(0)
            .toUpperCase() +
          Object.entries((error as any).keyValue)[0]
            .join(' ')
            .slice(1) +
          ' already exists'
        : error.message
      : error;

  return res
    .status(
      error instanceof PeerPrepError
        ? error.statusCode
        : HttpStatusCode.BAD_REQUEST
    )
    .json({ error: errorMessage });
};
