"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbConfig_1 = __importDefault(require("./config/dbConfig"));
const middlewareConfig_1 = __importDefault(require("./config/middlewareConfig"));
const sessionStore_1 = __importDefault(require("./config/sessionStore"));
const path_1 = __importDefault(require("path"));
const modules_1 = require("./modules");
const app = express_1.default();
dbConfig_1.default();
middlewareConfig_1.default(app);
app.use(sessionStore_1.default);
app.use('/api', [modules_1.UserRoutes, modules_1.ReqeustRoutes]);
var BUILD = path_1.default.join(__dirname, '../../build');
app.use(express_1.default.static(BUILD));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Listening on port 3000');
});
//# sourceMappingURL=app.js.map