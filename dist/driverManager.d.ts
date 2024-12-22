import { StorageDriver } from './interfaces';
export declare class DriverManager {
    private readonly driverMap;
    getDriver(disk: string, config: Record<string, any>): StorageDriver;
}
