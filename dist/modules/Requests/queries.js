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
const sessionStore_1 = require("../../config/sessionStore");
// Using flat to parse the data into the correct format
const unflatten = flat_1.default.unflatten;
/**
 * Gets the current users client session request, users who have a current session
 * will need to check the progress of their request
 */
exports.getClientRequestSession = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        /**
         * @param { string } req.body.clientRequestSession - This session token identifies the session
         *
         * We then make a call from the redis session regarding this users cook request
         */
        let clientSession = yield sessionStore_1.redisClient.get(req.body.clientRequestSession, (err, session) => {
            if (err)
                console.warn(err);
            // Parses the format of the data for it to be readable by JS
            return unflatten(session);
        });
        // Parses data to JSON
        const session = JSON.parse(clientSession);
        return res.status(201).json({ session });
    }
    catch (e) {
        return res.status(e.status).json({ error: true, message: 'Error getting users' });
    }
});
//# sourceMappingURL=queries.js.map