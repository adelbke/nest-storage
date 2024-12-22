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
exports.Local = void 0;
const path_1 = require("path");
const fs = require("fs-extra");
class Local {
    constructor(disk, config) {
        this.disk = disk;
        this.config = config;
    }
    put(filePath, fileContent, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fs.outputFile((0, path_1.join)(this.config.basePath || "", filePath), fileContent);
            const url = !!this.config.baseUrl
                ? (0, path_1.join)(this.config.baseUrl, filePath)
                : "";
            return { path: (0, path_1.join)(this.config.basePath || "", filePath), url };
        });
    }
    get(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fs.readFile((0, path_1.join)(this.config.basePath || "", filePath));
            return res;
        });
    }
    meta(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const path = (0, path_1.join)(this.config.basePath || "", filePath);
            const res = yield fs.stat(path);
            return {
                path,
                contentLength: res.size,
                lastModified: res.mtime,
            };
        });
    }
    signedUrl(filePath, expire = 10) {
        return "";
    }
    exists(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            return fs.pathExists((0, path_1.join)(this.config.basePath || "", filePath));
        });
    }
    missing(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            return !(yield this.exists(filePath));
        });
    }
    url(fileName) {
        if (this.config.hasOwnProperty("baseUrl") && !!this.config.baseUrl) {
            const fileUrl = (0, path_1.join)(this.config.baseUrl, fileName);
            return fileUrl;
        }
        else {
            return "";
        }
    }
    delete(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fs.remove((0, path_1.join)(this.config.basePath || "", filePath));
            }
            catch (e) { }
            return true;
        });
    }
    copy(path, newPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fs.copy((0, path_1.join)(this.config.basePath || "", path), (0, path_1.join)(this.config.basePath || "", newPath), { overwrite: true });
            return {
                path: (0, path_1.join)(this.config.basePath || "", newPath),
                url: this.url(newPath),
            };
        });
    }
    move(path, newPath) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.copy(path, newPath);
            yield this.delete(path);
            return {
                path: (0, path_1.join)(this.config.basePath || "", newPath),
                url: this.url(newPath),
            };
        });
    }
    getClient() {
        return null;
    }
    getConfig() {
        return this.config;
    }
}
exports.Local = Local;
