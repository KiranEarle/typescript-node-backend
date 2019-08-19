import _ from 'flat'
import { redisClient } from '../config/sessionStore'

const unflatten = _.unflatten

interface ISessionClient {
  get(): Promise<string>
  set(data: Object): Promise<void>
}

export default class SessionClient implements ISessionClient {
  private sessionId: string

  public constructor(sessionId: string) {
    this.sessionId = sessionId
  }


  public async get() {
    try {
      let clientSession = await redisClient.get(this.sessionId, (err, session: string) => {
        if (err) console.warn(err)

        return unflatten(session)
      })

      let session = JSON.parse(<any>clientSession)

      return session
    } catch (e) {
      console.warn(e)
    }
  }

  public async set(data: Object){
    const session = JSON.stringify(data)

    try {
      await redisClient.set(this.sessionId, session)
    } catch (e) {
      console.warn(e)
    }
  }
}