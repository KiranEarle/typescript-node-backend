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
const RequestController = __importStar(require("./controller"));
const RequestQueries = __importStar(require("./queries"));
const router = express_1.default.Router();
router.post('/new-request', RequestController.createFoodRequest);
router.post('/accept-cook-request', RequestController.acceptFoodRequest);
router.post('/updated-cook-request', RequestController.updateFoodRequestStatus);
router.post('/get-request-session', RequestQueries.getClientRequestSession);
router.post('/request-proposal', RequestController.requestProposition);
exports.default = router;
//# sourceMappingURL=routes.js.map