import Config from "../interfaces/Config";
import { app } from "electron";
import * as fs from "fs";

export default () => {
  const defaultConfig: Config = {
    coeiroink: {
      path: ""
    },
    download: {
      cache_path: "",
      save_cache: true,
      auto_install: true,
      auto_update: true
    },
    app: {
      auto_update: true,
      version: "1.0.0"
    }
  };
  if (!fs.existsSync(app.getPath("userData") + "/config.json")) {
    fs.writeFileSync(app.getPath("userData") + "/config.json", JSON.stringify(defaultConfig), { encoding: "utf-8" });
  }
}
