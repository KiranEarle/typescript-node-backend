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
const model_1 = __importDefault(require("../model"));
const SessionClient_1 = __importDefault(require("../../../helpers/SessionClient"));
const requestState_1 = __importDefault(require("../../../constants/requestState"));
class CreateFoodRequest {
    constructor(req, res, title, description, userDetails) {
        this.req = req;
        this.res = res;
        this.title = title;
        this.description = description;
        this.userDetails = userDetails;
    }
    errorHandler(title, description, userDetails) {
        if (!title) {
            this.res.status(400).json({ error: true, message: 'title must be provided' });
            return true;
        }
        else if (!description) {
            this.res.status(400).json({ error: true, message: 'description must be provided' });
            return true;
        }
        else if (!userDetails.username) {
            this.res.status(400).json({ error: true, message: 'username must be provided' });
            return true;
        }
        else if (!userDetails.firstName) {
            this.res.status(400).json({ error: true, message: 'firstName must be provided' });
            return true;
        }
        else if (!userDetails.lastName) {
            this.res.status(400).json({ error: true, message: 'lastName must be provided' });
            return true;
        }
        else if (!userDetails.type) {
            this.res.status(400).json({ error: true, message: 'type must be provided' });
            return true;
        }
        else {
            return false;
        }
    }
    createNewRequest(title, description, userDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const newRequest = new model_1.default({
                title,
                description,
                status: requestState_1.default.NEW_REQUEST,
                userDetails,
                proposals: [],
            });
            let request = {};
            try {
                request = yield newRequest.save();
                return this.res.status(201).json({ request });
            }
            catch (e) {
                return this.res.status(e.status).json({ error: true, message: 'Error creating request' });
            }
            finally {
                /**
                 * Gets the current information about the users request and then uses the id
                 * to find it in the database, after doing so retrives the data and sets
                 * a redis store session which will then be used to monitor the activity
                 * of the request while it is in session.
                 */
                try {
                    const setRequestSession = yield model_1.default.findById(request._id, (err, request) => {
                        if (err)
                            console.warn('this has errored', err);
                        return request;
                    });
                    // Stringify's the data because of the way redis enterprits json
                    const Session = new SessionClient_1.default(setRequestSession._id);
                    // Sets the redis session
                    yield Session.set(setRequestSession);
                }
                catch (e) {
                    console.warn(e);
                    return this.res.status(e.status).json({ error: true, message: 'error setting session in cache', e });
                }
            }
        });
    }
    run() {
        const error = this.errorHandler(this.title, this.description, this.userDetails);
        if (error)
            return;
        this.createNewRequest(this.title, this.description, this.userDetails);
    }
}
exports.default = CreateFoodRequest;
//# sourceMappingURL=CreateFoodRequest.js.map