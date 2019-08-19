import express from 'express'
import * as RequestController from './controller'
import * as RequestQueries from './queries'

const router = express.Router()

router.post('/new-request', RequestController.createFoodRequest)
router.post('/accept-cook-request', RequestController.acceptFoodRequest)
router.post('/updated-cook-request', RequestController.updateFoodRequestStatus)
router.post('/get-request-session', RequestQueries.getClientRequestSession)
router.post('/request-proposal', RequestController.requestProposition)

export default router
