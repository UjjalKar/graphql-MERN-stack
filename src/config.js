export const {
  APP_PORT = 4000,
  NODE_ENV = 'development',
  DB_USERNAME = 'admin',
  DB_PASSWORD = 'random',
  DB_HOST = 'localhost',
  DB_PORT = 27017,
  DB_NAME = 'chatting',
  DB_LOCAL = 'mongodb://localhost:27017'
} = process.env
export const IN_PROD = NODE_ENV === 'production'
