"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connection_1 = __importDefault(require("./connection"));
exports.default = () => {
    mongoose_1.default.Promise = global.Promise;
    mongoose_1.default.connect(connection_1.default.DB_URL, { useNewUrlParser: true });
    mongoose_1.default.connection
        .once('open', () => console.log('Mongodb running'))
        .on('error', (err) => console.error(err));
};
//# sourceMappingURL=dbConfig.js.map