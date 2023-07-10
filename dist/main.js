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
exports.bootstrap = void 0;
const connectDB_1 = require("./connectDB");
const index_1 = require("./index");
const cron_service_1 = require("./services/cron.service");
const undici_1 = require("undici");
const bootstrap = () => __awaiter(void 0, void 0, void 0, function* () {
    const port = process.env.PORT || 5000;
    try {
        yield (0, connectDB_1.connectDB)(process.env.MONGO_URI);
        index_1.app.listen(port, () => console.log(`Server is listening on port ${port}...`));
        (0, undici_1.fetch)('https://rss-feed-node.onrender.com/api/v1/feed')
            .then((response) => (0, cron_service_1.cronFunctionService)())
            .catch((error) => console.log(error));
    }
    catch (error) {
        console.log(error);
    }
});
exports.bootstrap = bootstrap;
(0, exports.bootstrap)();
