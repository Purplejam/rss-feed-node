"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomAPIError = void 0;
class CustomAPIError extends Error {
    constructor(message, status) {
        super(message);
        this.statusCode = status;
    }
}
exports.CustomAPIError = CustomAPIError;
