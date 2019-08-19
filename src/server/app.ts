import express from 'express'
import dbConfig from './config/dbConfig'
import middlewareConfig from './config/middlewareConfig'
import session from './config/sessionStore'
import path from 'path'
import { UserRoutes, ReqeustRoutes } from './modules'

const app = express()

dbConfig()
middlewareConfig(app)
app.use(session)

app.use('/api', [UserRoutes, ReqeustRoutes])

var BUILD = path.join(__dirname, '../../build')

app.use(express.static(BUILD))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log('Listening on port 3000')
})