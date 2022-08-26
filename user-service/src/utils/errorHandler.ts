import { Response } from 'express'
import { HttpStatusCode } from './HttpsStatusCode'
import { PeerPrepError } from './PeerPrepError'

export const errorHandler = (res: Response, error: unknown) => {
  return res
    .send(
      error instanceof PeerPrepError
        ? error.statusCode
        : HttpStatusCode.BAD_REQUEST
    )
    .json({ message: error instanceof Error ? error.message : error })
}
