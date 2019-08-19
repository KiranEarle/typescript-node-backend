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
const SessionClient_1 = __importDefault(require("../../../helpers/SessionClient"));
const requestState_1 = __importDefault(require("../../../constants/requestState"));
class RequestProposition {
    constructor(req, res, cookUserDetails, proposition, requestSessionId) {
        this.req = req;
        this.res = res;
        this.cookUserDetails = cookUserDetails;
        this.proposition = proposition;
        this.requestSessionId = requestSessionId;
    }
    errorHandler(cookUserDetails, proposition, requestSessionId) {
        if (!cookUserDetails.username) {
            this.res.status(400).json({ error: true, message: 'username must be provided' });
            return true;
        }
        else if (!cookUserDetails.firstName) {
            this.res.status(400).json({ error: true, message: 'firstName must be provided' });
            return true;
        }
        else if (!cookUserDetails.lastName) {
            this.res.status(400).json({ error: true, message: 'lastName must be provided' });
            return true;
        }
        else if (!cookUserDetails.type) {
            this.res.status(400).json({ error: true, message: 'type must be provided' });
            return true;
        }
        else if (!requestSessionId) {
            this.res.status(400).json({ error: true, message: 'requestSessionId must be provided' });
            return true;
        }
        else if (!proposition.title) {
            this.res.status(400).json({ error: true, message: 'proposition title must be provided' });
            return true;
        }
        else if (!proposition.description) {
            this.res.status(400).json({ error: true, message: 'proposition description must be provided' });
            return true;
        }
        else if (!proposition.price) {
            this.res.status(400).json({ error: true, message: 'proposition price must be provided' });
            return true;
        }
        else if (!proposition.estimatedTime) {
            this.res.status(400).json({ error: true, message: 'proposition estimatedTime must be provided' });
            return true;
        }
        else {
            return false;
        }
    }
    requestProposition(cookUserDetails, proposition, requestSessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Session = new SessionClient_1.default(requestSessionId);
                let session = yield Session.get();
                session.proposals.push({ cookUserDetails, proposition });
                yield Session.set(session);
                return this.res.status(201).json({ session });
            }
            catch (e) {
                console.warn(e);
                return this.res.status(e.status).json({ error: true, message: 'error setting session in cache', e });
            }
        });
    }
    acceptFoodRequest(cookUserDetails, proposition, requestSessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                /**
                 * Gets current session from redis cache using the session ID
                 */
                const Session = new SessionClient_1.default(requestSessionId);
                let session = yield Session.get();
                const assignedCookData = {
                    cook: cookUserDetails,
                    agreedProposal: proposition
                };
                session = Object.assign({}, session, assignedCookData);
                session.status = requestState_1.default.IN_PROGRESS;
                // Updates the session in the redis cache
                yield Session.set(session);
                return this.res.status(201).json({ session });
            }
            catch (e) {
                console.warn(e);
                return this.res.status(e.status).json({ error: true, message: 'failed to accept order', e });
            }
        });
    }
    run() {
        const error = this.errorHandler(this.cookUserDetails, this.proposition, this.requestSessionId);
        if (error)
            return;
        this.requestProposition(this.cookUserDetails, this.proposition, this.requestSessionId);
    }
    runAcceptFood() {
        const error = this.errorHandler(this.cookUserDetails, this.proposition, this.requestSessionId);
        if (error)
            return;
        this.acceptFoodRequest(this.cookUserDetails, this.proposition, this.requestSessionId);
    }
}
exports.default = RequestProposition;
//# sourceMappingURL=RequestProposition.js.map