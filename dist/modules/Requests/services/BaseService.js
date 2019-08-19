"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class BaseService {
    constructor() {
        this.req = express_1.default.request;
        this.res = express_1.default.response;
        this.router = express_1.default.Router();
    }
}
exports.default = BaseService;
//# sourceMappingURL=BaseService.js.map