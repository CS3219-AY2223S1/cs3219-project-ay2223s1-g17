import { createUser, getUserById, verifyUserLogin } from './repository'
import jwt from 'jsonwebtoken'

// need to separate orm functions from repository to decouple business logic from persistence
export const ormCreateUser = async (username: string, password: string) => {
  const newUser = await createUser(username, password)
  newUser.save()
}

export const ormGetVerifiedUserAndToken = async (
  username: string,
  password: string
) => {
  const verifiedUser = await verifyUserLogin(username, password)

  const token = jwt.sign(verifiedUser._id, process.env.JWT_SECRET ?? '')
  return { verifiedUser, token }
}

export const ormGetUserInfoFromToken = async (userId: string) => {
  return getUserById(userId)
}
