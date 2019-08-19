import morgan from 'morgan'
import { Express } from 'express'
import bodyParser from 'body-parser'

//import passport from '../authentication/passport'

export default (app: Express) => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded())
  app.use(morgan('dev'))
  //app.use(passport.initialize())
  //app.use(passport.session())
}