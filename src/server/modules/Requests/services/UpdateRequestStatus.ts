import { Request, Response } from 'express'
import REQUEST_STATE from '../../../constants/requestState'
import SessionClient from '../../../helpers/SessionClient'

export default class UpdateRequestStatus {
  private req: Request
  private res: Response
  private requestSessionId: string
  private status: string

  public constructor(req: Request, res: Response, requestSessionId: string, status: string) {
    this.req = req
    this.res = res
    this.requestSessionId = requestSessionId
    this.status = status
  }


  private errorHandler(requestSessionId: string, status: string): boolean {
    if (!requestSessionId) {
      this.res.status(400).json({ error: true, message: 'requestSessionId must be provided' })
      return true
    }

    const VALID_STATE = Object.values(REQUEST_STATE).some(key => { return status === key })

    if (!VALID_STATE) {
      this.res.status(400).json({ error: true, message: 'Require correct state assignment' })
      return true
    }

    return false
  }

  private async update(requestSessionId: string, status: string): Promise<any> {
    const Session = new SessionClient(requestSessionId)

    switch (status) {
      case REQUEST_STATE.READY:
        try {
          let session = await Session.get()

          if (session.status === REQUEST_STATE.REJECTED) {
            return this.res.status(500).json({
              error: true,
              message: 'Cannot set state to Ready while session is currently in a Rejected state'
            })
          }

          session.status = REQUEST_STATE.READY

          await Session.set(session)

          return this.res.status(201).json({ session })

        } catch (e) {
          console.warn(e)
          return this.res.status(e.status).json({ error: true, message: 'failed to change request state', e})
        }

      case REQUEST_STATE.REJECTED:
        try {

          let session = await Session.get()

          session.status = REQUEST_STATE.REJECTED

          delete session.cook

          await Session.set(session)

          return this.res.status(201).json({ session })

        } catch (e) {
          console.warn(e)
          return this.res.status(e.status).json({ error: true, message: 'failed to change request state', e})
        }

      case REQUEST_STATE.COMPLETE:
        try {
          let session = await Session.get()

          if (session.status === REQUEST_STATE.REJECTED) {
            return this.res.status(500).json({
              error: true,
              message: 'Cannot set state to Ready while session is currently in a Rejected state'
            })
          }

          session.status = REQUEST_STATE.COMPLETE

          await Session.set(session)

          return this.res.status(201).json({ session })

        } catch (e) {
          console.warn(e)
          return this.res.status(e.status).json({ error: true, message: 'failed to change request state', e})
        }
    }
  }

  public run(): void{
    const error = this.errorHandler(this.requestSessionId, this.status)

    if (error) return

    this.update(this.requestSessionId, this.status)
  }
}