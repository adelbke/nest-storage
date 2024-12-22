import { StorageDriver$GetFileResponse, StorageDriver$FileMetadataResponse, StorageDriver$PutFileResponse, StorageDriver$RenameFileResponse, FileOptions } from ".";
export interface StorageDriver {
    put(path: string, fileContent: any, options?: FileOptions): Promise<StorageDriver$PutFileResponse>;
    get(path: string): Promise<StorageDriver$GetFileResponse>;
    exists(path: string): Promise<boolean>;
    missing(path: string): Promise<boolean>;
    url(path: string): string;
    signedUrl(path: string, expireInMinutes: number): string;
    meta(path: string): Promise<StorageDriver$FileMetadataResponse>;
    delete(path: string): Promise<boolean>;
    copy(path: string, newPath: string): Promise<StorageDriver$RenameFileResponse>;
    move(path: string, newPath: string): Promise<StorageDriver$RenameFileResponse>;
    getClient(): any;
    getConfig(): Record<string, any>;
}
