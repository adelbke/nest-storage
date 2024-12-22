import { StorageOptions } from "./interfaces";
import { StorageDriver } from "./interfaces";
export declare class StorageService {
    private static diskDrivers;
    private static options;
    private static driverManager;
    constructor(options: StorageOptions);
    static getDriver(disk: string): StorageDriver;
    static newDriver(disk: string): StorageDriver;
}
