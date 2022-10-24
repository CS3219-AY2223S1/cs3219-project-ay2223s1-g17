import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { IUser, IUserModel, UserDocument } from './user.types';
import jwt from 'jsonwebtoken';
import { HttpStatusCode, PeerPrepError } from '../../../utils';
import {
  HISTORY_URL,
  MULTIAVATAR_FIELD_MAX,
  MULTIAVATAR_FIELD_MIN,
  MULTIAVATAR_NUM_FIELDS,
  STATISTICS_CREATION_URL,
  STATISTICS_URL,
} from './user.constants';
import axios from 'axios';

const userSchema = new mongoose.Schema<IUser, IUserModel>({
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
  avatarImage: {
    type: String,
  },
});

userSchema.pre('save', async function (callback) {
  const user = this;

  if (user.isModified('password')) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  }

  if (user.isNew) {
    // create user's initital statistics
    const { status: statisticsStatus, data: statisticsData } = await axios.post(
      STATISTICS_CREATION_URL,
      {
        userId: user._id.toString(),
      }
    );
    console.log(statisticsStatus, statisticsData);
    if (statisticsStatus !== HttpStatusCode.OK)
      throw new PeerPrepError(statisticsStatus, statisticsData);

    let avatarId = '';
    for (let i = 0; i < MULTIAVATAR_NUM_FIELDS; i++) {
      avatarId += Math.floor(
        Math.random() * (MULTIAVATAR_FIELD_MAX - MULTIAVATAR_FIELD_MIN + 1) +
          MULTIAVATAR_FIELD_MIN
      );
    }
    const { status: multiAvatarStatus, data: multiAvatarData } =
      await axios.get(`https://api.multiavatar.com/${avatarId}`);
    if (multiAvatarStatus !== HttpStatusCode.OK)
      throw new PeerPrepError(multiAvatarStatus, multiAvatarData);

    const multiAvatarImage = multiAvatarData;
    const buffer = Buffer.from(multiAvatarImage);
    user.avatarImage = buffer.toString('base64');
  }

  callback();
});

userSchema.pre('remove', async function (callback) {
  const user = this;
  const data = { userId: user._id.toString() };

  // delete user's history
  const { status: historyStatus, data: historyData } = await axios.delete(
    HISTORY_URL,
    { data }
  );
  if (historyStatus !== HttpStatusCode.OK)
    throw new PeerPrepError(historyStatus, historyData);

  // delete user's statistics
  const { status: statisticsStatus, data: statisticsData } = await axios.delete(
    STATISTICS_URL,
    { data }
  );
  if (statisticsStatus !== HttpStatusCode.OK)
    throw new PeerPrepError(statisticsStatus, statisticsData);

  callback();
});

userSchema.static(
  'createUser',
  /**
   * Attempts to create a new user with the specified credentials
   *
   * @param username Username of the new user
   * @param password Unhashed password of the new user
   * @throws Error if credentials are missing
   */
  async function createUser(username: string, password: string) {
    await User.create({ username, password });
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
   * Attempts to delete a user with a specified id
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

    return jwt.sign({ _id: user._id }, String(process.env.JWT_SECRET));
  }
);

const User = mongoose.model<IUser, IUserModel>('User', userSchema);

export default User;
