"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const parser_controller_1 = require("../controllers/parser.controller");
const router = express_1.default.Router();
router.route('/').get(parser_controller_1.parseController);
router.route('/articles').get(parser_controller_1.queryFeedController);
exports.default = router;
