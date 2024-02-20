export interface Config {
  coeiroink: {
    path: string | null
  },
  download: {
    cache_path: string
    save_cache: boolean
    auto_install: boolean
    auto_update: boolean
  },
  app: {
    auto_update: boolean
    version: string
  }
}

export interface ConfigFile {
  coeiroink: {
    path: string
  },
  download: {
    cache_path: string
    save_cache: boolean
    auto_install: boolean
    auto_update: boolean
  },
  app: {
    auto_update: boolean
  }
}
export default Config;
