// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron"
import { BrowseOpenOptions } from "./service/server/browse"

const API: ApiInterface = {
    browse: {
        openDirectory(options: Partial<BrowseOpenOptions>): Promise<string[]> {
            return ipcRenderer.invoke("browse/open-directory", options)
        },
        openFile(options: Partial<BrowseOpenOptions>): Promise<string[]> {
            return ipcRenderer.invoke("browse/open-file", options)
        },
    },

    fs: {
        async loadJSON<T>(
            path: string,
            guard: (data: unknown) => asserts data is T
        ): Promise<T> {
            const data = await ipcRenderer.invoke("fs/load-json", path)
            guard(data)
            return data
        },
        saveJSON(path: string, data: unknown): Promise<void> {
            return ipcRenderer.invoke("fs/save-json", path, data)
        },
        readBinary(path: string): Promise<ArrayBuffer> {
            return ipcRenderer.invoke("fs/read-binary", path)
        },
        writeBinary(path: string, content: ArrayBuffer): Promise<void> {
            return ipcRenderer.invoke("fs/write-binary", path, content)
        },
        getDirContent(path: string): Promise<string[]> {
            return ipcRenderer.invoke("fs/get-dir-content", path)
        },
    },
}

contextBridge.exposeInMainWorld("API", API)
