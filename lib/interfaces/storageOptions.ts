import { ModuleMetadata, Type } from "@nestjs/common/interfaces";

export interface LocalDiskOptions {
  driver: "local";
  basePath: string;
  baseUrl?: string;
}

export interface S3DiskOptions {
  driver: "s3";
  profile?: string;
  region?: string;
  bucket: string;
  prefix?: string;
  accessKey?: string;
  secretKey?: string;
  basePath: string;
  fetchRemoteCredentials?: boolean;
  baseUrl?: string;
  endpoint?: string;
}
export type DiskOptions = LocalDiskOptions | S3DiskOptions;

export interface StorageOptions {
  default: string;
  disks: Record<string, DiskOptions>;
}

export interface StorageOptionsFactory {
  createStorageOptions(): Promise<StorageOptions> | StorageOptions;
}

export interface StorageAsyncOptions extends Pick<ModuleMetadata, "imports"> {
  name?: string;
  useExisting?: Type<StorageOptions>;
  useClass?: Type<StorageOptions>;
  useFactory?: (...args: any[]) => Promise<StorageOptions> | StorageOptions;
  inject?: any[];
}
