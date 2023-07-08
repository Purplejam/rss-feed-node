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
exports.showCurrentUser = exports.login = exports.register = void 0;
const auth_service_1 = require("../services/auth.service");
const errors_1 = require("../errors");
const http_status_codes_1 = require("http-status-codes");
const UserSchema_1 = require("../models/UserSchema");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
        throw new errors_1.BadRequestError('Please provide email, name and password');
    }
    const emailAlreadyExists = yield UserSchema_1.User.findOne({ email });
    if (emailAlreadyExists) {
        throw new errors_1.BadRequestError('Email already exists');
    }
    const user = yield (0, auth_service_1.registerService)(email, name, password);
    if (!user) {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        msg: 'Success! User has been created'
    });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new errors_1.BadRequestError('Please provide email and password');
    }
    const user = yield UserSchema_1.User.findOne({ email });
    if (!user) {
        throw new errors_1.UnauthenticatedError('Invalid Credentials');
    }
    const isPasswordCorrect = yield user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new errors_1.UnauthenticatedError('Invalid Credentials');
    }
    const isUserVerified = user.isVerified;
    if (!isUserVerified) {
        throw new errors_1.BadRequestError('Please verify your email');
    }
    const tokenUser = yield (0, auth_service_1.attachCookieService)(req, res, user);
    return res.status(http_status_codes_1.StatusCodes.OK).json({ user: tokenUser });
});
exports.login = login;
const showCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        return res.status(http_status_codes_1.StatusCodes.OK).json({ user: req.user });
    }
    else {
        res.status(http_status_codes_1.StatusCodes.OK).json({ msg: 'There is no user' });
    }
});
exports.showCurrentUser = showCurrentUser;
