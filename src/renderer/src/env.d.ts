/// <reference types="vite/client" />

import {IIpcBridge} from "../../preload/IIpcBridge";

declare module '*.vue' {
    import type {DefineComponent} from 'vue'
    import {IIpcBridge} from "../../preload/IIpcBridge";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>

    interface Window {
        ipcBridge: IIpcBridge;
    }

    export default component
}
declare global {
    interface Window {
        ipcBridge: IIpcBridge;
    }
}
