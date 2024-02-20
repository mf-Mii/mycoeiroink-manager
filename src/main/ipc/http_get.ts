
export default async function IPC_HttpGet(path: string): Promise<Response> {
    return await fetch(path);
}
