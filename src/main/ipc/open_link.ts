import { shell } from 'electron';

export default async function IPC_OpenLink(url: string): Promise<void> {
  return await shell.openExternal(url);
}
