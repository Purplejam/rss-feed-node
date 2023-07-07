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
exports.queryArticles = exports.createNewFeed = exports.feedDeleteMany = void 0;
const Article_schema_1 = require("../models/Article.schema");
const sortingMap_1 = require("../controllers/sortingMap");
const feedDeleteMany = () => __awaiter(void 0, void 0, void 0, function* () {
    const { deletedCount } = yield Article_schema_1.Article.deleteMany({});
    return deletedCount;
});
exports.feedDeleteMany = feedDeleteMany;
const createNewFeed = (articles) => __awaiter(void 0, void 0, void 0, function* () {
    const newFeed = yield Article_schema_1.Article.create(articles);
    return newFeed;
});
exports.createNewFeed = createNewFeed;
const queryArticles = ({ category, searchQuery, sorting, page, limit, skip }) => __awaiter(void 0, void 0, void 0, function* () {
    let queryObject = {};
    if (category && category !== '' && category !== 'Усі') {
        queryObject.categories = { $regex: category, $options: 'i' };
    }
    if (searchQuery && searchQuery !== '') {
        queryObject.contentSnippet = { $regex: searchQuery, $options: 'i' };
    }
    let articles = Article_schema_1.Article.find(queryObject);
    if (sorting && sorting !== '') {
        articles = articles.sort(sortingMap_1.querySortingMap.get(sorting));
    }
    articles = articles.skip(skip).limit(limit);
    const result = yield articles;
    const totalArticles = yield Article_schema_1.Article.countDocuments(queryObject);
    return { result, totalArticles };
});
exports.queryArticles = queryArticles;
