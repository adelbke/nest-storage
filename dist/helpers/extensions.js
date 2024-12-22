"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMimeFromExtension = void 0;
const mime_db_1 = require("../data/mime-db");
const getMimeFromExtension = (fileName) => {
    const fileSplit = fileName.split(".");
    const fileExtension = fileSplit[fileSplit.length - 1];
    for (const mimeType in mime_db_1.MimeTypes) {
        const meta = mime_db_1.MimeTypes[mimeType];
        if (meta.extensions && meta.extensions.includes(fileExtension)) {
            return meta.extensions[0];
        }
    }
    return "";
};
exports.getMimeFromExtension = getMimeFromExtension;
