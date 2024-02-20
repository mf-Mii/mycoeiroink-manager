import { app, shell, BrowserWindow, ipcMain } from 'electron'
import {initialize} from "@electron/remote/main";
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
// @ts-ignore
import IPC_Config from "./ipc/config";
import IPC_FileRead from "./ipc/file_read";
import IPC_HttpGet from "./ipc/http_get";
import IPC_OpenLink from "./ipc/open_link";
import IPC_OpenPath from "./ipc/open_path";



function registerIpcHandlers(): void {
    ipcMain.handle('CONFIG_LOAD', () => {
        console.log("CONFIG_LOAD")
        return IPC_Config();
    });
    // @ts-ignore
    ipcMain.handle('HTTP_GET', (event, path: string) => {
        console.log("HTTP_GET")
        return IPC_HttpGet(path);
    });
    // @ts-ignore
    ipcMain.handle('FILE_READ', (event, path: string) => {
      console.log("FILE_READ")
      return IPC_FileRead(path);
    });
    // @ts-ignore
    ipcMain.handle('OPEN_LINK', (event, url: string) => {
        console.log("OPEN_LINK")
        return IPC_OpenLink(url);
    });
    // @ts-ignore
    ipcMain.handle('OPEN_PATH', (event, path: string) => {
        console.log("OPEN_PATH")
        return IPC_OpenPath(path);
    });
}


function createWindow(): void {
    console.log("createWindow()")
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: true,
      contextIsolation: true,
    },
  })
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
  registerIpcHandlers();
  initialize();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('work.mfmii.mycoe-manager')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
