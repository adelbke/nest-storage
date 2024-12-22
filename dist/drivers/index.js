"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Storage = exports.Local = void 0;
const local_1 = require("./local");
Object.defineProperty(exports, "Local", { enumerable: true, get: function () { return local_1.Local; } });
const s3Storage_1 = require("./s3Storage");
Object.defineProperty(exports, "S3Storage", { enumerable: true, get: function () { return s3Storage_1.S3Storage; } });
