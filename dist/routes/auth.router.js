"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = require("../middleware/authentication");
const auth_controller_1 = require("../controllers/auth.controller");
const router = express_1.default.Router();
router.route('/register').post(auth_controller_1.register);
router.route('/login').post(auth_controller_1.login);
router.route('/show-me').get(authentication_1.authenticateUser, auth_controller_1.showCurrentUser);
exports.default = router;
