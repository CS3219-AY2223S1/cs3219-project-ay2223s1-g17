import { NextFunction, Request, Response } from 'express'
import { errorHandler } from '../utils/errorHandler'
import { HttpStatusCode } from '../utils/HttpsStatusCode'
import { PeerPrepError } from '../utils/PeerPrepError'
import jwt from 'jsonwebtoken'

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token

    if (!token)
      throw new PeerPrepError(
        HttpStatusCode.UNAUTHENTICATED,
        'You are not authenticated'
      )

    const userId = jwt.verify(token, process.env.JWT_SECRET ?? '')
    req.body.userId = userId
    next()
  } catch (error) {
    errorHandler(res, error)
  }
}
