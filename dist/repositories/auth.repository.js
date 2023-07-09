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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTokenRepository = exports.deleteTokenRepository = exports.findTokenRepository = exports.createUserRepository = exports.findUserRepository = void 0;
const TokenSchema_1 = require("../models/TokenSchema");
const UserSchema_1 = require("../models/UserSchema");
const findUserRepository = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserSchema_1.User.findOne({ email });
    if (!user)
        return null;
    return user;
});
exports.findUserRepository = findUserRepository;
const createUserRepository = ({ name, email, password, role, verificationToken, }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserSchema_1.User.create({ name, email, password, role, verificationToken });
    if (!user)
        return null;
    return user;
});
exports.createUserRepository = createUserRepository;
const findTokenRepository = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield TokenSchema_1.Token.findOne({ user });
    if (!token)
        return null;
    return token;
});
exports.findTokenRepository = findTokenRepository;
const deleteTokenRepository = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield TokenSchema_1.Token.findOneAndDelete({ user });
});
exports.deleteTokenRepository = deleteTokenRepository;
const createTokenRepository = ({ refreshToken, ip, userAgent, user, }) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield TokenSchema_1.Token.create({ refreshToken, ip, userAgent, user });
    if (!token)
        return null;
    return token;
});
exports.createTokenRepository = createTokenRepository;
