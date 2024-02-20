import * as fs from "fs/promises";

export default async function IPC_FileRead(path: string): Promise<ArrayBuffer> {
  return (await fs.readFile(path)).buffer;
}
