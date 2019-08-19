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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const model_1 = __importDefault(require("../modules/Users/model"));
const LocalStrategy = passport_local_1.default.Strategy;
passport_1.default.use(new LocalStrategy(function (username, password, done) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('USER details', username, password);
        if (!username) {
            console.warn('username must be provided');
            return;
        }
        else if (!password) {
            console.warn('password must be provided');
            return;
        }
        yield model_1.default.findOne({ username: username }, function (err, user) {
            return __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                const isPasswordValid = yield user.validatePassword(password);
                if (!isPasswordValid) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                console.log('user', user);
                return done(null, user);
            });
        });
    });
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user._id);
});
passport_1.default.deserializeUser(function (id, done) {
    model_1.default.findById(id, function (err, user) {
        done(err, user);
    });
});
exports.default = passport_1.default;
//# sourceMappingURL=passport.js.map