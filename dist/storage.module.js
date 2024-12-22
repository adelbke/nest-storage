"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var StorageModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageModule = void 0;
const common_1 = require("@nestjs/common");
const storage_service_1 = require("./storage.service");
const provider_map_1 = require("./provider.map");
let StorageModule = StorageModule_1 = class StorageModule {
    static register(options) {
        return {
            global: true,
            module: StorageModule_1,
            providers: [
                storage_service_1.StorageService,
                {
                    provide: provider_map_1.map.STORAGE_OPTIONS,
                    useValue: options,
                },
            ],
        };
    }
    static registerAsync(options) {
        return {
            global: true,
            module: StorageModule_1,
            providers: [this.createStorageOptionsProvider(options), storage_service_1.StorageService],
        };
    }
    static createStorageOptionsProvider(options) {
        if (options.useFactory) {
            return {
                provide: provider_map_1.map.STORAGE_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        const inject = [
            (options.useClass || options.useExisting),
        ];
        return {
            provide: provider_map_1.map.STORAGE_OPTIONS,
            useFactory: (optionsFactory) => __awaiter(this, void 0, void 0, function* () { return yield optionsFactory.createStorageOptions(); }),
            inject,
        };
    }
};
StorageModule = StorageModule_1 = __decorate([
    (0, common_1.Module)({
        providers: [],
        exports: [],
    })
], StorageModule);
exports.StorageModule = StorageModule;
