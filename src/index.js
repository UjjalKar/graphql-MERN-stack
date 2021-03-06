import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import mongoose from 'mongoose'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import { APP_PORT, IN_PROD, DB_LOCAL, DB_NAME } from './config'

;(async () => {
  try {
    await mongoose.connect(`${DB_LOCAL}/${DB_NAME}`, {
      useNewUrlParser: true
    })
    const app = express()
    app.disable('x-powerd-by')

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      playground: !IN_PROD
    })

    server.applyMiddleware({ app })

    app.listen({ port: APP_PORT }, () => {
      console.log(
        `Server ready at http://localhost:${APP_PORT}${server.graphqlPath}`
      )
    })
  } catch (error) {
    console.error(error)
  }
})()
