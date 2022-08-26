import { Request, Response } from 'express'
import {
  ormCreateUser as _createUser,
  ormGetUserInfoFromToken as _getUserInfoFromToken,
  ormGetVerifiedUserAndToken as _getVerifiedUserAndToken,
} from '../model/user-orm.js'
import { errorHandler } from '../utils/errorHandler.js'
import { HttpStatusCode } from '../utils/HttpsStatusCode.js'

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body

    await _createUser(username, password)
    res.sendStatus(HttpStatusCode.OK)
  } catch (error) {
    errorHandler(res, error)
  }
}

export const logIn = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body

    const { verifiedUser, token } = await _getVerifiedUserAndToken(
      username,
      password
    )

    res
      .cookie('token', token, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 1000 * 60 * 60 * 24,
      })
      .send(HttpStatusCode.OK)
      .json(verifiedUser)
  } catch (error) {
    errorHandler(res, error)
  }
}

export const logOut = async (_: Request, res: Response) => {
  try {
    res.clearCookie('token').sendStatus(HttpStatusCode.OK)
  } catch (error) {
    errorHandler(res, error)
  }
}

export const getUserInfoFromToken = async (req: Request, res: Response) => {
  const { userId } = req.body

  const userInfo = await _getUserInfoFromToken(userId)

  res.send(HttpStatusCode.OK).json(userInfo)
}
