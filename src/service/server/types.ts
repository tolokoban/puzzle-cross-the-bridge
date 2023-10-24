export interface FileSystemServiceInterface {
    loadJSON<T>(path: string): Promise<T>
    saveJSON(path: string, data: unknown): Promise<void>
    getDirContent(path: string): Promise<string[]>
    readBinary(path: string): Promise<ArrayBuffer>
}
