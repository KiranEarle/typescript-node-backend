"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
//import passport from '../authentication/passport'
exports.default = (app) => {
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded());
    app.use(morgan_1.default('dev'));
    //app.use(passport.initialize())
    //app.use(passport.session())
};
//# sourceMappingURL=middlewareConfig.js.map