import {store} from "../main";

export function getConfig() {
    return store.state.config;
}
