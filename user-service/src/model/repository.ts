import bcrypt from 'bcrypt';
import 'dotenv/config';
import mongoose from 'mongoose';
import UserModel from './user-model';

// set up default mongoose connection
const mongoDbUrl =
  process.env.ENV === 'PROD'
    ? process.env.DB_CLOUD_URI
    : process.env.DB_LOCAL_URI;

mongoose.connect(mongoDbUrl ?? '');

const database = mongoose.connection;
database.on('error', console.error.bind(console, 'MongoDB Connection Error: '));

/**
 * Attempts to create a new user with the given credentials
 *
 * @param username User's selected username
 * @param password User's password
 */
export const createUser = async (username: string, password: string) => {
  if (!username) throw new Error('Username is required');
  if (!password) throw new Error('Password is required');

  const hashedPassword = await bcrypt.hash(
    password,
    process.env.SALT_ROUNDS || 10
  );

  return new UserModel({ username, hashedPassword });
};

/**
 * Attempts to get a user by the specified username
 *
 * @param username User's username
 */
export const getUserByUsername = async (username: string) => {
  if (!username) throw new Error('Username is required');

  const user = await UserModel.findOne({ username }).select('-password -__v');
  if (!user) throw new Error(`User ${username} not found`);

  return user;
};

/**
 * Attempts to get a user by the specified userId
 *
 * @param userId User's userId
 */
export const getUserById = async (userId: string) => {
  if (!userId) throw new Error('User not found');

  const user = await UserModel.findById(userId).select('-password -__v');
  if (!user) throw new Error(`User ${userId} not found`);

  return user;
};

/**
 * Verifies user with given credentials
 *
 * @param username User's selected username
 * @param password User's password
 */
export const verifyUserLogin = async (username: string, password: string) => {
  if (!username) throw new Error('Username is required');
  if (!password) throw new Error('Password is required');

  const user = await getUserByUsername(username);

  const isVerified = await bcrypt.compare(password, user.password);
  if (!isVerified) throw new Error('Password is incorrect');

  return user;
};
