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
exports.queryFeedController = exports.parseController = void 0;
const parse_service_1 = require("../services/parse.service");
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const parseController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { newFeedCount } = yield (0, parse_service_1.refreshFeedService)();
    if (!newFeedCount) {
        throw new errors_1.BadRequestError('Bad request: Oops, something went wrong!');
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ articlesCount: newFeedCount });
});
exports.parseController = parseController;
const queryFeedController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category, searchQuery, sorting } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;
    const skip = (page - 1) * limit;
    const { result, totalArticles } = yield (0, parse_service_1.queryFeedService)({ category, searchQuery, sorting, page, limit, skip });
    if (!result) {
        throw new errors_1.BadRequestError('Bad request: Oops, something went wrong!');
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ total: totalArticles, articles: result });
});
exports.queryFeedController = queryFeedController;
