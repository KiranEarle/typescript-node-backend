"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const salt = 10;
const defaultProperties = {
    type: String,
    required: true,
};
const User = new mongoose_1.Schema({
    username: Object.assign({}, defaultProperties),
    password: Object.assign({}, defaultProperties),
    email: Object.assign({}, defaultProperties),
    firstName: Object.assign({}, defaultProperties),
    lastName: Object.assign({}, defaultProperties),
    type: Object.assign({}, defaultProperties),
    catagories: {
        type: Array,
        required: false
    }
});
exports.Mongoose = User;
User.methods.setPassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        const hash = yield bcrypt_1.default.hash(password, salt);
        return hash;
    });
};
User.methods.validatePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        const checkPassword = yield bcrypt_1.default.compare(password, this.password);
        return checkPassword;
    });
};
exports.default = mongoose_1.default.model('Users', User);
//# sourceMappingURL=model.js.map