"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Article = exports.ArticleSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.ArticleSchema = new mongoose_1.default.Schema({
    title: {
        type: String
    },
    link: {
        type: String
    },
    pubDate: {
        type: String
    },
    enclosure: {
        url: {
            type: String
        }
    },
    content: {
        type: String
    },
    contentSnippet: {
        type: String
    },
    guid: {
        type: String
    },
    categories: {
        type: String
    },
    isoDate: {
        type: Date
    }
}, { timestamps: true });
exports.Article = mongoose_1.default.model('Article', exports.ArticleSchema);
