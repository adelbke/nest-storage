import { DynamicModule } from '@nestjs/common';
import { StorageOptions, StorageAsyncOptions } from './interfaces';
export declare class StorageModule {
    static register(options: StorageOptions): DynamicModule;
    static registerAsync(options: StorageAsyncOptions): DynamicModule;
    private static createStorageOptionsProvider;
}
