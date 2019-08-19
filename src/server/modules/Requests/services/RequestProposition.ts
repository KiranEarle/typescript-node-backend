import { Request, Response } from 'express'
import { IUserDetails, IProposition } from '../interfaces/interfaces'
import SessionClient from '../../../helpers/SessionClient'
import REQUEST_STATE from '../../../constants/requestState'

export default class RequestProposition {
  private cookUserDetails: IUserDetails
  private proposition: IProposition
  private requestSessionId: string
  private req: Request
  private res: Response

  public constructor(req: Request, res: Response, cookUserDetails: IUserDetails, proposition: IProposition, requestSessionId: string) {
    this.req = req
    this.res = res
    this.cookUserDetails = cookUserDetails
    this.proposition = proposition
    this.requestSessionId = requestSessionId
  }

  private errorHandler(cookUserDetails: IUserDetails, proposition: IProposition, requestSessionId: string): boolean {
    if (!cookUserDetails.username) {
      this.res.status(400).json({ error: true, message: 'username must be provided' })
      return true
    } else if (!cookUserDetails.firstName) {
      this.res.status(400).json({ error: true, message: 'firstName must be provided' })
      return true
    } else if (!cookUserDetails.lastName) {
      this.res.status(400).json({ error: true, message: 'lastName must be provided' })
      return true
    } else if (!cookUserDetails.type) {
      this.res.status(400).json({ error: true, message: 'type must be provided' })
      return true
    } else if (!requestSessionId) {
      this.res.status(400).json({ error: true, message: 'requestSessionId must be provided' })
      return true
    } else if (!proposition.title) {
      this.res.status(400).json({ error: true, message: 'proposition title must be provided' })
      return true
    } else if (!proposition.description) {
      this.res.status(400).json({ error: true, message: 'proposition description must be provided' })
      return true
    } else if (!proposition.price) {
      this.res.status(400).json({ error: true, message: 'proposition price must be provided' })
      return true
    } else if (!proposition.estimatedTime) {
      this.res.status(400).json({ error: true, message: 'proposition estimatedTime must be provided' })
      return true
    } else {
      return false
    }
  }

  private async requestProposition(cookUserDetails: IUserDetails, proposition: IProposition, requestSessionId: string): Promise<any> {
    try {
      const Session = new SessionClient(requestSessionId)
      let session = await Session.get()

      session.proposals.push({ cookUserDetails, proposition })

      await Session.set(session)

      return this.res.status(201).json({ session })

    } catch (e) {
      console.warn(e)
      return this.res.status(e.status).json({ error: true, message: 'error setting session in cache', e})
    }
  }

  private async acceptFoodRequest(cookUserDetails: IUserDetails, proposition: IProposition, requestSessionId: string): Promise<any> {
    try {
      /**
       * Gets current session from redis cache using the session ID
       */
      const Session = new SessionClient(requestSessionId)
      let session = await Session.get()

      const assignedCookData = {
        cook: cookUserDetails,
        agreedProposal: proposition
      }

      session = Object.assign({}, session, assignedCookData)
      session.status = REQUEST_STATE.IN_PROGRESS
      // Updates the session in the redis cache

      await Session.set(session)

      return this.res.status(201).json({ session })

    } catch (e) {
      console.warn(e)
      return this.res.status(e.status).json({ error: true, message: 'failed to accept order', e})
    }
  }

  public run(): void {
    const error = this.errorHandler(this.cookUserDetails, this.proposition, this.requestSessionId)

    if (error) return

    this.requestProposition(this.cookUserDetails, this.proposition, this.requestSessionId)
  }

  public runAcceptFood(): void {
    const error = this.errorHandler(this.cookUserDetails, this.proposition, this.requestSessionId)

    if (error) return

    this.acceptFoodRequest(this.cookUserDetails, this.proposition, this.requestSessionId)
  }
}