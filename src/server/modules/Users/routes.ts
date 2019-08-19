import express from 'express'
import * as UserController from './controller'
import * as UserQuearies from './queries'

const routes = express.Router()

routes.get('/get-users', UserQuearies.getUsers)

routes.post('/create-user', UserController.createUser)

routes.post('/login', UserController.getUserDetails)

routes.get('/logout', function(req, res){
  req.logout();
  return res.status(201).json({ message: 'logged out', user: req.user })
})
// routes.get('/send-user-details', UserController.sendUserDetails)

export default routes