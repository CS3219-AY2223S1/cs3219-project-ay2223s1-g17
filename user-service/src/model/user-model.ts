import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 6,
    maxLength: 12,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
})

const UserModel = mongoose.model('UserModel', UserSchema)
export default UserModel
