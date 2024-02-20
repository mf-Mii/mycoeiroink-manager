// @ts-ignore
import Config from "../../renderer/src/interfaces/Config";
import * as fs from "fs/promises";
import * as fsn from "fs";
import { app } from "electron";

export default async function loadConfig(): Promise<Config> {
  console.log("loading config");
  const filePath = app.getPath('userData') + '/config.json';
  let fileStr;
  try {
    if (fsn.existsSync(filePath)) {
      fileStr = await fs.readFile(app.getPath("userData") + "/config.json", {encoding: "utf-8"});
    } else {
      const defaultConfig = {
          coeiroink: {
              path: null
          },
          download: {
              cache_path: './cache',
              save_cache: false,
              auto_install: true,
              auto_update: true
          },
          app: {
              auto_update: true
          }
      };
      fs.writeFile(filePath, JSON.stringify(defaultConfig), {encoding: 'utf-8'})
        fileStr = fs.readFile(filePath, {encoding: "utf-8"})
    }
  } catch {
    throw new Error("Config file not found");
  }
    if (fileStr === undefined || fileStr === "") {
        throw new Error("Config file is empty");
    }
  const data = JSON.parse(fileStr) as Config;
  data.app.version = app.getVersion();
  return data;
}
