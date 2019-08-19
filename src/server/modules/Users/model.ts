import mongoose, { Schema, Document } from 'mongoose'
import bcrypt from 'bcrypt'
import passport from '../../authentication/passport';

const salt = 10

const defaultProperties = {
  type: String,
  required: true,
}

interface IUser extends Document {
  username?: string
  email?: string
  firstName?: string
  lastName?: string
  type?: string
  password: string
  catagories: Array<string>
  setPassword(password: string): string
  validatePassword(password: string): string
}

const User = new Schema({
  username: {
    ...defaultProperties
  },
  password: {
    ...defaultProperties
  },
  email: {
    ...defaultProperties
  },
  firstName: {
    ...defaultProperties
  },
  lastName: {
    ...defaultProperties
  },
  type: {
    ...defaultProperties
  },
  catagories: {
    type: Array,
    required: false
  }
})

User.methods.setPassword = async function(password: string) {
  const hash = await bcrypt.hash(password, salt)

  return hash
}

User.methods.validatePassword = async function(password: string) {
  const checkPassword = await bcrypt.compare(password, this.password)

  return checkPassword
}

export { User as Mongoose }
export default mongoose.model<IUser>('Users', User)