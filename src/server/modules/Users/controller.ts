import { Request, Response } from 'express'
import User, { } from './model'
import passport from '../../authentication/passport'

export const createUser = async (req: Request, res: Response) => {

  interface userInterface {
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string,
    type: string,
    catagories: any
  }

  const {
    username,
    password,
    email,
    firstName,
    lastName,
    type,
    catagories
  } = <userInterface>req.body

  if (!username) {
    return res.status(400).json({ error: true, message: 'username must be provided' })
  } else if (!password) {
    return res.status(400).json({ error: true, message: 'password must be provided' })
  } else if (!email) {
    return res.status(400).json({ error: true, message: 'email must be provided' })
  } else if (!firstName) {
    return res.status(400).json({ error: true, message: 'firstName must be provided' })
  } else if (!lastName) {
    return res.status(400).json({ error: true, message: 'lastName must be provided' })
  } else if (!type) {
    return res.status(400).json({ error: true, message: 'type must be provided' })
  }

  const newUser = new User({
    username,
    email,
    firstName,
    lastName,
    type,
    catagories
  })

  newUser.password = await newUser.setPassword(password)

  try {
    return res.status(201).json({ users: await newUser.save() })
  } catch (e) {
    return res.status(e.status).json({ error: true, message: 'Error creating user'})
  }
}

export const getUserDetails = (passport.authenticate('local'), function(req: Request, res: Response){
  return res.status(201).json({ message: 'logged in', user: req.user })
})
