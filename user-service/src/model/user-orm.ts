import { createUser, getUserById, verifyUserLogin } from './repository';
import jwt from 'jsonwebtoken';

/**
 * Creates a new user with the given credentials
 *
 * @param username Username given
 * @param password Password given
 */
export const ormCreateUser = async (username: string, password: string) => {
  const newUser = await createUser(username, password);
  await newUser.save();
};

/**
 * Verifies login credentials
 *
 * @param username Username given
 * @param password Password given
 */
export const ormGetVerifiedUserAndToken = async (
  username: string,
  password: string
) => {
  const verifiedUser = await verifyUserLogin(username, password);

  const token = jwt.sign(
    verifiedUser._id.toString(),
    process.env.JWT_SECRET ?? ''
  );

  return { verifiedUser, token };
};

/**
 * Gets a user by the specified userId
 *
 * @param userId User ID given
 */
export const ormGetUserInfoFromToken = async (userId: string) => {
  return getUserById(userId);
};
