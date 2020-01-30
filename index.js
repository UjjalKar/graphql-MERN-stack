const { ApolloServer, gql } = require('apollo-server');
const crypto = require('crypto');
const db = {
  users: [
    { id: '1', email: 'ujal@mail.com', name: 'Ujjal' },
    { id: '2', email: 'ujal2@mail.com', name: 'Ujjal2' }
  ],
  messages: [
    {
      id: '1',
      userId: '2',
      body: 'hello',
      createdAt: Date.now()
    },
    {
      id: '2',
      userId: '1',
      body: 'hi',
      createdAt: Date.now()
    },
    {
      id: '3',
      userId: '1',
      body: 'whats up',
      createdAt: Date.now()
    }
  ]
};

// class User {
//   constructor(user) {
//     Object.assign(this, user);
//   }
//   get messages() {
//     return db.messages.filter(msg => msg.userId === this.id);
//   }
// }

const typeDefs = gql`
  type Query {
    users: [User!]!
    user(id: ID!): User
    messages: [Message!]!
  }

  type User {
    id: ID!
    email: String!
    name: String
    avatarUrl: String
    messages: [Message!]!
  }
  type Message {
    id: ID!
    body: String!
    createdAt: String
  }
  type Mutation {
    addUser(email: String!, name: String): User
  }
`;

const resolvers = {
  Query: {
    users: () => db.users,
    user: (root, { id }) => db.users.find(user => user.id === id),
    messages: () => db.messages
  },
  Mutation: {
    addUser: (root, { email, name }) => {
      const user = {
        id: crypto.randomBytes(10).toString('hex'),
        email,
        name
      };
      db.users.push(user);
      return user;
    }
  },
  User: {
    messages: user => db.messages.filter(msg => msg.userId === user.id)
  }
};

// const server = new ApolloServer({ typeDefs, mocks: true });
const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => console.log(url));
