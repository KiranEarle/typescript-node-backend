import { Request, Response } from 'express'
import FoodRequest from '../model'
import { IUserDetails } from '../interfaces/interfaces'
import SessionClient from '../../../helpers/SessionClient'
import REQUEST_STATE from '../../../constants/requestState'

interface IFoodRequestObject {
  status: string
  proposals: Array<any>
}

export default class CreateFoodRequest {
  private title: string
  private description: string
  private userDetails: IUserDetails
  private req: Request
  private res: Response

  public constructor(req: Request, res: Response, title: string , description: string, userDetails: IUserDetails) {
    this.req = req
    this.res = res
    this.title = title
    this.description = description
    this.userDetails = userDetails
  }

  private errorHandler(title: string, description: string, userDetails: IUserDetails): boolean {
    if (!title) {
      this.res.status(400).json({ error: true, message: 'title must be provided' })
      return true
    } else if (!description) {
      this.res.status(400).json({ error: true, message: 'description must be provided' })
      return true
    } else if (!userDetails.username) {
      this.res.status(400).json({ error: true, message: 'username must be provided' })
      return true
    } else if (!userDetails.firstName) {
      this.res.status(400).json({ error: true, message: 'firstName must be provided' })
      return true
    } else if (!userDetails.lastName) {
      this.res.status(400).json({ error: true, message: 'lastName must be provided' })
      return true
    } else if (!userDetails.type) {
      this.res.status(400).json({ error: true, message: 'type must be provided' })
      return true
    } else {
      return false
    }
  }

  private async createNewRequest(title: string, description: string, userDetails: IUserDetails): Promise<any> {
    const newRequest = new FoodRequest(<IFoodRequestObject>{
      title,
      description,
      status: REQUEST_STATE.NEW_REQUEST,
      userDetails,
      proposals: [],
    })

    let request: any = {}

    try {
      request = await newRequest.save()
      return this.res.status(201).json({ request })
    } catch (e) {
      return this.res.status(e.status).json({ error: true, message: 'Error creating request'})
    } finally {

      /**
       * Gets the current information about the users request and then uses the id
       * to find it in the database, after doing so retrives the data and sets
       * a redis store session which will then be used to monitor the activity
       * of the request while it is in session.
       */

      try {
        const setRequestSession = await FoodRequest.findById(request._id, (err: Object, request: Object) => {
          if (err) console.warn('this has errored', err)

          return request
        })

        // Stringify's the data because of the way redis enterprits json
        const Session = new SessionClient(setRequestSession._id)

          // Sets the redis session
        await Session.set(setRequestSession)

      } catch (e) {
        console.warn(e)
        return this.res.status(e.status).json({ error: true, message: 'error setting session in cache', e})
      }
    }
  }

  public run(): void{
    const error = this.errorHandler(this.title, this.description, this.userDetails)

    if (error) return

    this.createNewRequest(this.title, this.description, this.userDetails)
  }
}