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
const RequestProposition_1 = __importDefault(require("./RequestProposition"));
const SessionClient_1 = __importDefault(require("../../../helpers/SessionClient"));
const requestState_1 = __importDefault(require("../../../constants/requestState"));
class AcceptFoodRequest extends RequestProposition_1.default {
    constructor(req, res, cookUserDetails, proposition, requestSessionId) {
        super(req, res, cookUserDetails, proposition, requestSessionId);
        this.req = req;
        this.res = res;
        this.cookUserDetails = cookUserDetails;
        this.proposition = proposition;
        this.requestSessionId = requestSessionId;
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
}
exports.default = AcceptFoodRequest;
//# sourceMappingURL=AcceptFoodRequest.js.map