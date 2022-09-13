import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import {
  IUser,
  IUserModel,
  UserDocument,
  UserQueryOptions,
} from './user.types';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema<IUser, IUserModel>({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 12,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    select: false,
  },
  friends: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
});

userSchema.pre('save', async function (callback) {
  const user = this;

  if (user.isModified('password')) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  }

  callback();
});

userSchema.pre('remove', async function (callback) {
  const user = this;

  await User.updateMany(
    { friends: { _id: user._id } },
    { $pull: { friends: { _id: user._id } } }
  );

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
    if (!username) throw new Error('Username is required');
    if (!password) throw new Error('Password is required');

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
    if (!username) throw new Error('Username is required');
    if (!password) throw new Error('Password is required');

    const user = await User.findOne({ username }).select('password');
    if (!user) throw new Error(`User ${username} not found`);

    const isVerified = await bcrypt.compare(password, user.password);
    if (!isVerified) throw new Error('Password is incorrect');

    return User.findUserByUsername(username, { onlySelectIdentifiers: true });
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
  async function findUserByUsername(
    username: string,
    options: UserQueryOptions
  ) {
    if (!username) throw new Error('Username is required');

    const query = User.findOne({ username });
    const user = options?.onlySelectIdentifiers
      ? await query.select('-friends -__v').exec()
      : await query.exec();

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
  async function findUserById(id: string, options?: UserQueryOptions) {
    if (!id) throw new Error('User id is required');

    const query = User.findById(id);
    const user = options?.onlySelectFriends
      ? await query.select('friends').exec()
      : await query.exec();

    if (!user) throw new Error('User not found');
    return user;
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
