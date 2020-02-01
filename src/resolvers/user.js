import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
import { User } from '../models'

export default {
  Query: {
    users: (root, args, context, info) => {
      // TODO: auth, projectino, pagination sanitization
      return User.find({})
    },
    user: (root, { id }, context, info) => {
      // TODO: auth, projection
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not valid user ID`)
      }
      return User.findById(id)
    }
  },
  Mutation: {
    signUp: (root, args, context, info) => {
      // TODO: not auth

      // TODO: Validation
      return User.create(args)
    }
  }
}
