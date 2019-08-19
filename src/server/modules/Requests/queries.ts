import { Request, Response } from 'express'
import _ from 'flat'
import { redisClient } from '../../config/sessionStore'
// Using flat to parse the data into the correct format
const unflatten = _.unflatten

/**
 * Gets the current users client session request, users who have a current session
 * will need to check the progress of their request
 */

export const getClientRequestSession = async (req: Request, res: Response) => {
  try {

    /**
     * @param { string } req.body.clientRequestSession - This session token identifies the session
     *
     * We then make a call from the redis session regarding this users cook request
     */

    let clientSession = await redisClient.get(req.body.clientRequestSession, (err, session) => {
      if (err) console.warn(err)

      // Parses the format of the data for it to be readable by JS
      return unflatten(session)
    })

    // Parses data to JSON
    const session = JSON.parse(<any>clientSession)
    return res.status(201).json({ session })
  } catch (e) {
    return res.status(e.status).json({ error: true, message: 'Error getting users'})
  }
}