"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverManager = void 0;
const drivers_1 = require("./drivers");
class DriverManager {
    constructor() {
        this.driverMap = {
            local: drivers_1.Local,
            s3: drivers_1.S3Storage,
        };
    }
    getDriver(disk, config) {
        const driver = this.driverMap[config.driver];
        return new driver(disk, config);
    }
}
exports.DriverManager = DriverManager;
