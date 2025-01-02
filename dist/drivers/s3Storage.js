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
exports.S3Storage = void 0;
const aws_sdk_1 = require("aws-sdk");
const helpers_1 = require("../helpers");
class S3Storage {
    constructor(disk, config) {
        this.disk = disk;
        this.config = config;
        const options = {
            signatureVersion: "v4",
            region: this.config.region,
        };
        if (config.profile) {
            options["credentials"] = new aws_sdk_1.SharedIniFileCredentials({
                profile: config.profile,
            });
        }
        else if (config.accessKey && config.secretKey) {
            options["credentials"] = new aws_sdk_1.Credentials({
                accessKeyId: config.accessKey,
                secretAccessKey: config.secretKey,
            });
        }
        if (config.endpoint) {
            options.endpoint = config.endpoint;
            options.s3ForcePathStyle = true;
        }
        this.client = new aws_sdk_1.S3(options);
    }
    put(path, fileContent, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { mimeType } = options || {};
            let params = Object.assign({ Bucket: this.config.bucket, Key: this.getPath(path), Body: fileContent, ContentType: mimeType ? mimeType : (0, helpers_1.getMimeFromExtension)(path) }, ((options === null || options === void 0 ? void 0 : options.s3Meta) || {}));
            yield this.client.upload(params).promise();
            return { url: this.url(this.getPath(path)), path: this.getPath(path) };
        });
    }
    signedUrl(path, expireInMinutes = 20) {
        const params = {
            Bucket: this.config.bucket,
            Key: this.getPath(path),
            Expires: 60 * expireInMinutes,
        };
        const signedUrl = this.client.getSignedUrl("getObject", params);
        return signedUrl;
    }
    get(path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = {
                    Bucket: this.config.bucket || "",
                    Key: this.getPath(path),
                };
                const res = yield this.client.getObject(params).promise();
                return res.Body;
            }
            catch (e) {
                return null;
            }
        });
    }
    exists(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const meta = yield this.meta(this.getPath(path));
            return Object.keys(meta).length > 0 ? true : false;
        });
    }
    meta(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                Bucket: this.config.bucket,
                Key: this.getPath(path),
            };
            try {
                const res = yield this.client
                    .headObject(params)
                    .promise();
                return {
                    path: this.getPath(path),
                    contentType: res.ContentType,
                    contentLength: res.ContentLength,
                    lastModified: res.LastModified,
                };
            }
            catch (e) {
                return {};
            }
        });
    }
    missing(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const meta = yield this.meta(this.getPath(path));
            return Object.keys(meta).length === 0 ? true : false;
        });
    }
    url(path) {
        return this.signedUrl(this.getPath(path), 20).split("?")[0];
    }
    delete(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                Bucket: this.config.bucket || "",
                Key: this.getPath(path),
            };
            try {
                yield this.client.deleteObject(params).promise();
                return true;
            }
            catch (err) {
                return false;
            }
        });
    }
    copy(path, newPath) {
        return __awaiter(this, void 0, void 0, function* () {
            this.client
                .copyObject({
                Bucket: this.config.bucket || "",
                CopySource: this.config.bucket + "/" + this.getPath(path),
                Key: newPath,
            })
                .promise();
            return { path: newPath, url: this.url(newPath) };
        });
    }
    move(path, newPath) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.copy(this.getPath(path), newPath);
            yield this.delete(this.getPath(path));
            return { path: newPath, url: this.url(newPath) };
        });
    }
    getClient() {
        return this.client;
    }
    getConfig() {
        return this.config;
    }
    getPath(path) {
        return this.config.basePath ? `${this.config.basePath}/${path}` : path;
    }
}
exports.S3Storage = S3Storage;
