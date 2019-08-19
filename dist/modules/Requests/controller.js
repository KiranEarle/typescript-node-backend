"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CreateFoodRequest_1 = __importDefault(require("./services/CreateFoodRequest"));
const RequestProposition_1 = __importDefault(require("./services/RequestProposition"));
const UpdateRequestStatus_1 = __importDefault(require("./services/UpdateRequestStatus"));
/**
 * Creating a food request as a consumer, this following function
 * will store the request in the database with a time stamp and then
 * create a redis session for the user which will begin to monitor
 * the cooking request session.
 * @param { string } req.title Title of the request
 * @param { string } req.description Description of the request
 * @param { object } req.userDetails Requires users deatils of who had made the request
 */
const createFoodRequest = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { title, description, userDetails } = req.body;
    const foodRequest = new CreateFoodRequest_1.default(req, res, title, description, userDetails);
    console.log(CreateFoodRequest_1.default);
    foodRequest.run();
});
exports.createFoodRequest = createFoodRequest;
/**
 * Sends request proposistion and appends it to the request object
 * @param { object } req.cookUserDetails Cooks details
  * @param { string } req.requestSessionId Session id
  * @param { object } req.proposition Object with all the details of the cooks offer
 */
const requestProposition = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { cookUserDetails, proposition, requestSessionId } = req.body;
    const propose = new RequestProposition_1.default(req, res, cookUserDetails, proposition, requestSessionId);
    propose.run();
});
exports.requestProposition = requestProposition;
/**
 * User accepts cook from the propositions food requests, gets session from redis cache and then append cooks details
 * while setting the status to in progress. Session is then cached again with its new
 * status.
 *
 * @param { string } req.requestSessionId Request session Id
 * @param { object } req.userDetails Requires users deatils of who had accpeted the cook request
 */
const acceptFoodRequest = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { cookUserDetails, requestSessionId, proposition } = req.body;
    const propose = new RequestProposition_1.default(req, res, cookUserDetails, proposition, requestSessionId);
    propose.runAcceptFood();
});
exports.acceptFoodRequest = acceptFoodRequest;
/**
 * Updates the Food Request Status, changing the session to a Ready or Cancelled state
 *
 * - Ready means that the request is ready to be picked up or dropped
 * - Reject means that the request which was accpeted by a cook was now rejected
 *
 * @param { string } req.requestSessionId Session id that reference cache session
 * @param { string } req.status Session status
 */
const updateFoodRequestStatus = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { requestSessionId, status } = req.body;
    const foodStatus = new UpdateRequestStatus_1.default(req, res, requestSessionId, status);
    foodStatus.run();
});
exports.updateFoodRequestStatus = updateFoodRequestStatus;
//# sourceMappingURL=controller.js.map