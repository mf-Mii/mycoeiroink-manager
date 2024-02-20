import { Config } from '../renderer/src/interfaces/Config'
export interface IIpcBridge {
  CONFIG_LOAD(): Promise<Config>;

  HTTP_GET(path: string): Promise<Response>;

  FILE_READ(path: string): Promise<ArrayBuffer>;
  OPEN_LINK(url: string): Promise<void>;
  OPEN_PATH(path: string): Promise<void>;
}
