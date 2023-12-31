"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cronFunctionService = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const undici_1 = require("undici");
const cronFunctionService = () => {
    const timeInterval = process.env.INTERVAL_DURATION || 10;
    return node_cron_1.default.schedule(`*/${timeInterval} * * * *`, () => {
        (0, undici_1.fetch)('https://rss-feed-node.onrender.com/api/v1/feed')
            .then((res) => res.json())
            .then((res) => console.log('Articles update!'))
            .catch((error) => console.log(error));
    });
};
exports.cronFunctionService = cronFunctionService;
