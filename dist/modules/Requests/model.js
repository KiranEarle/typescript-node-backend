"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const defaultProperties = {
    type: String,
    required: true,
};
const FoodRequest = new mongoose_1.Schema({
    title: Object.assign({}, defaultProperties),
    description: Object.assign({}, defaultProperties),
    status: Object.assign({}, defaultProperties),
    userDetails: {
        type: Object,
        required: true,
    },
    proposals: {
        type: Array,
        required: false,
    },
}, {
    timestamps: {
        createdAt: 'created_at'
    }
});
exports.default = mongoose_1.default.model('FoodRequest', FoodRequest);
//# sourceMappingURL=model.js.map