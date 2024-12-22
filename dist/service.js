"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var StorageService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const common_1 = require("@nestjs/common");
const driverManager_1 = require("./driverManager");
const constants_1 = require("./constants");
let StorageService = StorageService_1 = class StorageService {
    constructor(options) {
        StorageService_1.options = options;
        StorageService_1.diskDrivers = {};
        StorageService_1.driverManager = new driverManager_1.DriverManager();
    }
    static getDriver(disk) {
        disk = disk || this.options.default;
        if (StorageService_1.diskDrivers[disk]) {
            return StorageService_1.diskDrivers[disk];
        }
        const driver = StorageService_1.newDriver(disk);
        StorageService_1.diskDrivers[disk] = driver;
        return driver;
    }
    static newDriver(disk) {
        return StorageService_1.driverManager.getDriver(disk, StorageService_1.options.disks[disk]);
    }
};
StorageService = StorageService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.STORAGE_OPTIONS)),
    __metadata("design:paramtypes", [Object])
], StorageService);
exports.StorageService = StorageService;
