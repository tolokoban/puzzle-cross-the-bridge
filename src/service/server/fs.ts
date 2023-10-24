import { FileSystemServiceInterface } from "./types"
import * as FS from "fs/promises"
import JSON5 from "json5"

class FileSystemService implements FileSystemServiceInterface {
    async loadJSON<T>(path: string): Promise<T> {
        const data = await FS.readFile(path)
        const text = data.toString()
        return JSON5.parse(text)
    }

    async saveJSON(path: string, data: unknown): Promise<void> {
        await FS.writeFile(path, JSON5.stringify(data))
    }

    async readBinary(path: string): Promise<ArrayBuffer> {
        const data = await FS.readFile(path)
        return data
    }

    async writeBinary(path: string, content: ArrayBuffer): Promise<void> {
        const buff = new Uint8Array(content)
        await FS.writeFile(path, buff)
    }

    async getDirContent(path: string): Promise<string[]> {
        const files = await FS.readdir(path, {
            withFileTypes: true,
        })

        return files.map(file => file.name)
    }
}

export default new FileSystemService()
