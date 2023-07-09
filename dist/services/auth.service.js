"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachCookieService = exports.registerService = void 0;
const crypto_1 = __importDefault(require("crypto"));
const jwt_service_1 = require("./jwt.service");
const errors_1 = require("../errors");
const createTokenUser_service_1 = require("./createTokenUser.service");
const UserSchema_1 = require("../models/UserSchema");
const auth_repository_1 = require("../repositories/auth.repository");
const registerService = (email, name, password) => __awaiter(void 0, void 0, void 0, function* () {
    const isFirstAccount = (yield UserSchema_1.User.countDocuments({})) === 0;
    const role = isFirstAccount ? 'admin' : 'user';
    const verificationToken = crypto_1.default.randomBytes(20).toString('hex');
    const user = yield (0, auth_repository_1.createUserRepository)({ name, email, password, role, verificationToken });
    return user;
});
exports.registerService = registerService;
const attachCookieService = (req, res, user) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenUser = (0, createTokenUser_service_1.createTokenUser)({ name: user.name, id: user._id, role: user.role });
    let refreshToken = '';
    const existingToken = yield (0, auth_repository_1.findTokenRepository)(user._id);
    if (existingToken) {
        const { isValid } = existingToken;
        if (!isValid) {
            throw new errors_1.UnauthenticatedError('Invalid Credentials');
        }
        refreshToken = existingToken.refreshToken;
        (0, jwt_service_1.attachCookiesToResponse)(res, tokenUser, refreshToken);
    }
    else {
        refreshToken = crypto_1.default.randomBytes(20).toString('hex');
        const userAgent = req.headers['user-agent'];
        const ip = req.ip;
        const userToken = {
            refreshToken,
            isValid: true,
            ip,
            userAgent,
            user: user._id,
        };
        yield (0, auth_repository_1.createTokenRepository)(userToken);
        (0, jwt_service_1.attachCookiesToResponse)(res, tokenUser, refreshToken);
    }
    return tokenUser;
});
exports.attachCookieService = attachCookieService;
