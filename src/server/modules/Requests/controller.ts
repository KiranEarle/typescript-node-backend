import { Request, Response } from 'express'
import { ICreateFoodRequest, IAcceptFoodRequest } from './interfaces/interfaces'
import CreateFoodRequest from './services/CreateFoodRequest'
import RequestProposition from './services/RequestProposition'
import UpdateRequestStatus from './services/UpdateRequestStatus'


/**
 * Creating a food request as a consumer, this following function
 * will store the request in the database with a time stamp and then
 * create a redis session for the user which will begin to monitor
 * the cooking request session.
 * @param { string } req.title Title of the request
 * @param { string } req.description Description of the request
 * @param { object } req.userDetails Requires users deatils of who had made the request
 */

const createFoodRequest = async (req: Request, res: Response) => {

  const { title, description, userDetails } = <ICreateFoodRequest>req.body

  const foodRequest = new CreateFoodRequest(req, res, title, description, userDetails)
  console.log(CreateFoodRequest)
  foodRequest.run()
}

/**
 * Sends request proposistion and appends it to the request object
 * @param { object } req.cookUserDetails Cooks details
 * @param { string } req.requestSessionId Session id
 * @param { object } req.proposition Object with all the details of the cooks offer
 */
const requestProposition = async (req: Request, res: Response) => {

  const { cookUserDetails, proposition, requestSessionId } = req.body

  const propose = new RequestProposition(req, res, cookUserDetails, proposition, requestSessionId)

  propose.run()

}

/**
 * User accepts cook from the propositions food requests, gets session from redis cache and then append cooks details
 * while setting the status to in progress. Session is then cached again with its new
 * status.
 *
 * @param { string } req.requestSessionId Request session Id
 * @param { object } req.userDetails Requires users deatils of who had accpeted the cook request
 */

const acceptFoodRequest = async (req: Request, res: Response) => {

  const { cookUserDetails, requestSessionId, proposition } = <IAcceptFoodRequest>req.body

  const propose = new RequestProposition(req, res, cookUserDetails, proposition, requestSessionId)

  propose.runAcceptFood()

}

/**
 * Updates the Food Request Status, changing the session to a Ready or Cancelled state
 *
 * - Ready means that the request is ready to be picked up or dropped
 * - Reject means that the request which was accpeted by a cook was now rejected
 *
 * @param { string } req.requestSessionId Session id that reference cache session
 * @param { string } req.status Session status
 */

const updateFoodRequestStatus = async (req: Request, res: Response) => {

  const { requestSessionId, status } = req.body

  const foodStatus = new UpdateRequestStatus(req, res, requestSessionId, status)

  foodStatus.run()
}

export { createFoodRequest, requestProposition, acceptFoodRequest, updateFoodRequestStatus }