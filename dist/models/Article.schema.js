"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Article = exports.ArticleSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.ArticleSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    pubDate: {
        type: String,
        required: true
    },
    enclosure: {
        required: true,
        type: Object,
        url: {
            type: String,
            required: true
        },
    },
    content: {
        type: String,
        required: true
    },
    contentSnippet: {
        type: String,
        required: true
    },
    guid: {
        type: String,
        required: true
    },
    categories: {
        type: String,
        required: true
    },
    isoDate: {
        type: Date,
        required: true
    },
}, { timestamps: true });
exports.Article = mongoose_1.default.model('Article', exports.ArticleSchema);
