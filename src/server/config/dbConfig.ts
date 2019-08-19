import mongoose from 'mongoose'
import connection from './connection'

export default () => {
  mongoose.Promise = global.Promise
  mongoose.connect(connection.DB_URL, { useNewUrlParser: true })
  mongoose.connection
  .once('open', () => console.log('Mongodb running'))
  .on('error', (err: string) => console.error(err))
}