"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachCookiesToResponse = exports.isTokenValid = exports.createJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createJWT = ({ payload }) => {
    const secret = process.env.JWT_SECRET;
    const token = jsonwebtoken_1.default.sign(payload, secret);
    return token;
};
exports.createJWT = createJWT;
const isTokenValid = (token) => {
    const secret = process.env.JWT_SECRET;
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.isTokenValid = isTokenValid;
const attachCookiesToResponse = (res, user, refreshToken) => {
    const accessTokenJWT = (0, exports.createJWT)({ payload: { user } });
    const refreshTokenJWT = (0, exports.createJWT)({ payload: { user, refreshToken } });
    const oneDay = 1000 * 60 * 60 * 24;
    const oneMonth = 1000 * 60 * 60 * 24 * 30;
    res.cookie('accessToken', accessTokenJWT, {
        httpOnly: true,
        signed: true,
        expires: new Date(Date.now() + oneDay),
        secure: true,
    });
    res.cookie('refreshToken', refreshTokenJWT, {
        httpOnly: true,
        signed: true,
        expires: new Date(Date.now() + oneMonth),
        secure: true,
    });
};
exports.attachCookiesToResponse = attachCookiesToResponse;
