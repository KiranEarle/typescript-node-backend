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
const requestState_1 = __importDefault(require("../../../constants/requestState"));
const SessionClient_1 = __importDefault(require("../../../helpers/SessionClient"));
class UpdateRequestStatus {
    constructor(req, res, requestSessionId, status) {
        this.req = req;
        this.res = res;
        this.requestSessionId = requestSessionId;
        this.status = status;
    }
    errorHandler(requestSessionId, status) {
        if (!requestSessionId) {
            this.res.status(400).json({ error: true, message: 'requestSessionId must be provided' });
            return true;
        }
        const VALID_STATE = Object.values(requestState_1.default).some(key => { return status === key; });
        if (!VALID_STATE) {
            this.res.status(400).json({ error: true, message: 'Require correct state assignment' });
            return true;
        }
        return false;
    }
    update(requestSessionId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const Session = new SessionClient_1.default(requestSessionId);
            switch (status) {
                case requestState_1.default.READY:
                    try {
                        let session = yield Session.get();
                        if (session.status === requestState_1.default.REJECTED) {
                            return this.res.status(500).json({
                                error: true,
                                message: 'Cannot set state to Ready while session is currently in a Rejected state'
                            });
                        }
                        session.status = requestState_1.default.READY;
                        yield Session.set(session);
                        return this.res.status(201).json({ session });
                    }
                    catch (e) {
                        console.warn(e);
                        return this.res.status(e.status).json({ error: true, message: 'failed to change request state', e });
                    }
                case requestState_1.default.REJECTED:
                    try {
                        let session = yield Session.get();
                        session.status = requestState_1.default.REJECTED;
                        delete session.cook;
                        yield Session.set(session);
                        return this.res.status(201).json({ session });
                    }
                    catch (e) {
                        console.warn(e);
                        return this.res.status(e.status).json({ error: true, message: 'failed to change request state', e });
                    }
                case requestState_1.default.COMPLETE:
                    try {
                        let session = yield Session.get();
                        if (session.status === requestState_1.default.REJECTED) {
                            return this.res.status(500).json({
                                error: true,
                                message: 'Cannot set state to Ready while session is currently in a Rejected state'
                            });
                        }
                        session.status = requestState_1.default.COMPLETE;
                        yield Session.set(session);
                        return this.res.status(201).json({ session });
                    }
                    catch (e) {
                        console.warn(e);
                        return this.res.status(e.status).json({ error: true, message: 'failed to change request state', e });
                    }
            }
        });
    }
    run() {
        const error = this.errorHandler(this.requestSessionId, this.status);
        if (error)
            return;
        this.update(this.requestSessionId, this.status);
    }
}
exports.default = UpdateRequestStatus;
//# sourceMappingURL=UpdateRequestStatus.js.map