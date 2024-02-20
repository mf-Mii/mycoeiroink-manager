import { shell } from 'electron';

export default async function IPC_OpenPath(url: string): Promise<void> {
  await shell.openPath(url);
}
