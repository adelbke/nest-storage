/// <reference types="node" />
/// <reference types="node" />
import { FileOptions, LocalDiskOptions, StorageDriver, StorageDriver$FileMetadataResponse, StorageDriver$PutFileResponse, StorageDriver$RenameFileResponse } from "../interfaces";
export declare class Local implements StorageDriver {
    private disk;
    private config;
    constructor(disk: string, config: LocalDiskOptions);
    put(filePath: string, fileContent: any, options?: FileOptions): Promise<StorageDriver$PutFileResponse>;
    get(filePath: string): Promise<Buffer>;
    meta(filePath: string): Promise<StorageDriver$FileMetadataResponse>;
    signedUrl(filePath: string, expire?: number): string;
    exists(filePath: string): Promise<boolean>;
    missing(filePath: string): Promise<boolean>;
    url(fileName: string): string;
    delete(filePath: string): Promise<boolean>;
    copy(path: string, newPath: string): Promise<StorageDriver$RenameFileResponse>;
    move(path: string, newPath: string): Promise<StorageDriver$RenameFileResponse>;
    getClient(): null;
    getConfig(): Record<string, any>;
}
