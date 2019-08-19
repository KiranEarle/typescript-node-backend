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
const flat_1 = __importDefault(require("flat"));
const sessionStore_1 = require("../config/sessionStore");
const unflatten = flat_1.default.unflatten;
class SessionClient {
    constructor(sessionId) {
        this.sessionId = sessionId;
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let clientSession = yield sessionStore_1.redisClient.get(this.sessionId, (err, session) => {
                    if (err)
                        console.warn(err);
                    return unflatten(session);
                });
                let session = JSON.parse(clientSession);
                return session;
            }
            catch (e) {
                console.warn(e);
            }
        });
    }
    set(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = JSON.stringify(data);
            try {
                yield sessionStore_1.redisClient.set(this.sessionId, session);
            }
            catch (e) {
                console.warn(e);
            }
        });
    }
}
exports.default = SessionClient;
//# sourceMappingURL=SessionClient.js.map