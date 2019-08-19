"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController = __importStar(require("./controller"));
const UserQuearies = __importStar(require("./queries"));
const routes = express_1.default.Router();
routes.get('/get-users', UserQuearies.getUsers);
routes.post('/create-user', UserController.createUser);
routes.post('/login', UserController.getUserDetails);
routes.get('/logout', function (req, res) {
    req.logout();
    return res.status(201).json({ message: 'logged out', user: req.user });
});
// routes.get('/send-user-details', UserController.sendUserDetails)
exports.default = routes;
//# sourceMappingURL=routes.js.map