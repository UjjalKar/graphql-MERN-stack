import mongoose from 'mongoose'
import { hash } from 'bcryptjs'
const userSchema = new mongoose.Schema(
  {
    email: String,
    name: String,
    username: String,
    password: String
  },
  {
    timestamps: true
  }
)
userSchema.pre('save', async function (next) {
  // prettier-ignore

  if (this.isModified('password')) {
    try {
      this.password = await hash(this.password, 10) // args.password
    } catch (error) {
      next(error)
    }
  }
  next()
})
export default mongoose.model('User', userSchema)
