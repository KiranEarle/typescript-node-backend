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
const model_1 = __importDefault(require("./model"));
const passport_1 = __importDefault(require("../../authentication/passport"));
exports.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { username, password, email, firstName, lastName, type, catagories } = req.body;
    if (!username) {
        return res.status(400).json({ error: true, message: 'username must be provided' });
    }
    else if (!password) {
        return res.status(400).json({ error: true, message: 'password must be provided' });
    }
    else if (!email) {
        return res.status(400).json({ error: true, message: 'email must be provided' });
    }
    else if (!firstName) {
        return res.status(400).json({ error: true, message: 'firstName must be provided' });
    }
    else if (!lastName) {
        return res.status(400).json({ error: true, message: 'lastName must be provided' });
    }
    else if (!type) {
        return res.status(400).json({ error: true, message: 'type must be provided' });
    }
    const newUser = new model_1.default({
        username,
        email,
        firstName,
        lastName,
        type,
        catagories
    });
    newUser.password = yield newUser.setPassword(password);
    try {
        return res.status(201).json({ users: yield newUser.save() });
    }
    catch (e) {
        return res.status(e.status).json({ error: true, message: 'Error creating user' });
    }
});
exports.getUserDetails = (passport_1.default.authenticate('local'), function (req, res) {
    return res.status(201).json({ message: 'logged in', user: req.user });
});
//# sourceMappingURL=controller.js.map