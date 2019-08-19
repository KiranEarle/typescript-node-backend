import { Request, Response } from 'express'
import CreateUser from './model'

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await CreateUser.find({})

    return res.status(201).json({ users })
  } catch (e) {
    return res.status(e.status).json({ error: true, message: 'Error getting users'})
  }
}