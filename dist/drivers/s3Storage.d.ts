/// <reference types="node" />
import { StorageDriver, DiskOptions, FileOptions, StorageDriver$FileMetadataResponse, StorageDriver$PutFileResponse, StorageDriver$RenameFileResponse } from "../interfaces";
import { S3 } from "aws-sdk";
export declare class S3Storage implements StorageDriver {
    private readonly disk;
    private config;
    private client;
    constructor(disk: string, config: DiskOptions);
    put(path: string, fileContent: any, options?: FileOptions): Promise<StorageDriver$PutFileResponse>;
    signedUrl(path: string, expireInMinutes?: number): string;
    get(path: string): Promise<Buffer | null>;
    exists(path: string): Promise<boolean>;
    meta(path: string): Promise<StorageDriver$FileMetadataResponse>;
    missing(path: string): Promise<boolean>;
    url(path: string): string;
    delete(path: string): Promise<boolean>;
    copy(path: string, newPath: string): Promise<StorageDriver$RenameFileResponse>;
    move(path: string, newPath: string): Promise<StorageDriver$RenameFileResponse>;
    getClient(): S3;
    getConfig(): Record<string, any>;
    getPath(path: string): string;
}
