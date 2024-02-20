import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import {IIpcBridge} from "./IIpcBridge";
import Config from "../renderer/src/interfaces/Config";

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('ipcBridge', <IIpcBridge>{
        CONFIG_LOAD: async () => {
          console.log("CONFIG_LOAD")
          return (await ipcRenderer.invoke('CONFIG_LOAD')) as Config;
        },
        HTTP_GET: async (path: string) => {
            console.log("HTTP_GET")
            return (await ipcRenderer.invoke('HTTP_GET', path)) as Response;
        },
        FILE_READ: async (path: string) => {
            console.log("FILE_READ")
            return (await ipcRenderer.invoke('FILE_READ', path)) as ArrayBuffer;
        },
        OPEN_LINK: async (url: string) => {
            console.log("OPEN_LINK")
            return (await ipcRenderer.invoke('OPEN_LINK', url)) as void;
        },
        OPEN_PATH: async (path: string) => {
            console.log("OPEN_PATH")
            return (await ipcRenderer.invoke('OPEN_PATH', path)) as void;
        }
    })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
console.log("preload/index.ts: end")
