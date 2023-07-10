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
exports.deleteSingleArticleService = exports.updateSingleArticleService = exports.queryFeedService = exports.refreshFeedService = exports.parseService = void 0;
const rss_parser_1 = __importDefault(require("rss-parser"));
const parser_repository_1 = require("../repositories/parser.repository");
const parseService = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const parser = new rss_parser_1.default();
    const feed = yield parser.parseURL(url);
    const feedItems = feed.items;
    const articles = [];
    feedItems.forEach((item) => {
        const newArticle = {
            title: item.title,
            link: item.link,
            pubDate: item.pubData ? item.pubData : item.pubDate,
            enclosure: {
                url: item.enclosure.url,
            },
            content: item.content,
            contentSnippet: item.contentSnippet,
            guid: item.guid,
            categories: item.categories[0],
            isoDate: item.isoData ? new Date(item.isoData) : new Date(item.isoDate),
        };
        articles.push(newArticle);
    });
    return articles;
});
exports.parseService = parseService;
const refreshFeedService = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = process.env.PARSE_URL || 'https://nv.ua/ukr/rss/all.xml';
    const articles = yield (0, exports.parseService)(url);
    const deletedFeed = yield (0, parser_repository_1.feedDeleteMany)();
    const newFeed = yield (0, parser_repository_1.createNewFeed)(articles);
    const newFeedCount = newFeed.length;
    return { newFeed, newFeedCount };
});
exports.refreshFeedService = refreshFeedService;
const queryFeedService = ({ category, searchQuery, sorting, page, limit, skip, }) => __awaiter(void 0, void 0, void 0, function* () {
    const { result, totalArticles } = yield (0, parser_repository_1.queryArticles)({
        category,
        searchQuery,
        sorting,
        page,
        limit,
        skip,
    });
    return { result, totalArticles };
});
exports.queryFeedService = queryFeedService;
const updateSingleArticleService = ({ guid, newTextContent, }) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedArticle = yield (0, parser_repository_1.updateArticle)({ guid, newTextContent });
    return updatedArticle;
});
exports.updateSingleArticleService = updateSingleArticleService;
const deleteSingleArticleService = ({ guid }) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedCount = yield (0, parser_repository_1.deleteArticle)({ guid });
    return deletedCount;
});
exports.deleteSingleArticleService = deleteSingleArticleService;
