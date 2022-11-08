import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { IUser, IUserModel, UserDocument } from './user.types';
import jwt from 'jsonwebtoken';
import { HttpStatusCode, LANGUAGE, PeerPrepError } from '../utils';
import axios from 'axios';

const userSchema = new mongoose.Schema<IUser, IUserModel>(
  {
    username: {
      type: String,
      unique: true,
      required: [true, 'Username is required'],
      minLength: [3, 'Username is too short'],
      maxLength: [12, 'Username is too long'],
    },
    password: {
      type: String,
      select: false,
      required: [true, 'Password is required'],
      minLength: [6, 'Password is too short'],
    },
    preferredLanguage: {
      type: String,
      enum: LANGUAGE,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (callback) {
  const user = this;

  if (user.isModified('password')) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  }

  if (user.isNew) {
    const userId = user._id.toString();
    // create user's initital statistics
    const { status: statisticsStatus, data: statisticsData } = await axios.post(
      `${process.env.STATISTICS_URL}/${userId}`
    );
    if (statisticsStatus !== HttpStatusCode.OK)
      throw new PeerPrepError(statisticsStatus, statisticsData);
  }

  callback();
});

userSchema.pre('remove', async function (callback) {
  const user = this;
  const userId = user._id.toString();

  // delete user's history and stats
  const { status, data } = await axios.delete(
    `${process.env.HISTORY_URL}/${userId}`
  );
  if (status !== HttpStatusCode.OK) throw new PeerPrepError(status, data);

  callback();
});

userSchema.static(
  'createUser',
  /**
   * Attempts to create a new user with the specified credentials
   *
   * @param username Username of the new user
   * @param password Unhashed password of the new user
   * @param preferredLanguage Preferred programming language of the new user
   * @throws Error if credentials are missing
   */
  async function createUser(
    username: string,
    password: string,
    preferredLanguage: LANGUAGE
  ) {
    await User.create({ username, password, preferredLanguage });
  }
);

userSchema.static(
  'findVerifiedUser',
  /**
   * Attempts to find a verified user whose credentials
   * match the data stored in the server
   *
   * @param username Username of the user
   * @param password Unhashed password of the user
   * @returns Verified user if verification is successful
   * @throws Error if verification is unsuccessful
   */
  async function findVerifiedUser(username: string, password: string) {
    const user = await User.findOne({ username }).select('password');
    if (!user) throw new Error(`User ${username} not found`);

    const isVerified = await bcrypt.compare(password, user.password);
    if (!isVerified) throw new Error('Password is incorrect');

    return User.findUserByUsername(username);
  }
);

userSchema.static(
  'findUserByUsername',
  /**
   * Attempts to find a user with a specified username
   *
   * @param username Username of the user
   * @param options Optionally specify user data to select
   * @returns User matching the specified username
   * @throws Error if no user is found
   */
  async function findUserByUsername(username: string) {
    const user = await User.findOne({ username }).exec();

    if (!user) throw new Error(`User ${username} not found`);
    return user;
  }
);

userSchema.static(
  'findUserById',
  /**
   * Attempts to find a user with a specified id
   *
   * @param id Id of the user
   * @param options Optionally specify user data to select
   * @returns User matching the specified id
   * @throws Error if no user is found
   */
  async function findUserById(id: string) {
    if (!id) throw new Error('User id is required');
    const user = await User.findById(id).exec();
    if (!user)
      throw new PeerPrepError(HttpStatusCode.NOT_FOUND, 'User not found');

    return user;
  }
);

userSchema.static(
  'updateUserPasswordById',
  /**
   * Attempts to update the password of the user with the specified id
   *
   * @param id Id of the user
   * @param options Optionally specify user data to select
   * @throws Error if no user is found
   */
  async function updateUserPasswordById(
    id: string,
    currentPassword: string,
    newPassword: string
  ) {
    const user = await User.findUserById(id);
    const verifiedUser = await User.findVerifiedUser(
      user.username,
      currentPassword
    );

    verifiedUser.password = newPassword;
    await verifiedUser.save();
  }
);

userSchema.static(
  'updateUserPreferredLanguageById',
  /**
   * Attempts to update the preferred language of the user with the specified id
   *
   * @param id Id of the user
   * @throws Error if no user is found
   */
  async function updateUserPreferredLanguageById(
    id: string,
    preferredLanguage: LANGUAGE
  ) {
    const user = await User.findUserById(id);

    await user.updateOne({ preferredLanguage });
  }
);

userSchema.static(
  'deleteUserById',
  /**
   * Attempts to delete a user with a specified id
   *
   * @param id Id of the user
   * @param options Optionally specify user data to select
   * @throws Error if no user is found
   */
  async function deleteUserById(id: string) {
    const user = await User.findUserById(id);

    await user.deleteOne();
  }
);

userSchema.method(
  'generateJwtToken',
  /**
   * Generates a jwt token for a user
   *
   * @returns User's jwt token
   */
  function generateJwtToken() {
    const user: UserDocument = this;

    return jwt.sign({ _id: user._id }, String(process.env.JWT_SECRET), {
      expiresIn: '24h',
    });
  }
);

const User = mongoose.model<IUser, IUserModel>('User', userSchema);

export default User;
