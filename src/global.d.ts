interface ApiInterface {
    browse: {
        openDirectory(
            options: Partial<BrowseOpenFileOptions>
        ): Promise<string[]>
        openFile(options: Partial<BrowseOpenFileOptions>): Promise<string[]>
    }
    fs: {
        loadJSON<T>(
            path: string,
            guard: (data: unknown) => asserts data is T
        ): Promise<T>
        saveJSON(path: string, data: unknown): Promise<void>
        readBinary(path: string): Promise<ArrayBuffer>
        writeBinary(path: string, content: ArrayBuffer): Promise<void>
        getDirContent(path: string): Promise<string[]>
    }
}

declare global {
    interface Window {
        API: ApiInterface
    }
}

declare module "*.module.css" {
    const content: { [key: string]: string }
    export default content
}

declare module "*.png" {
    const value: string
    export = value
}

declare module "*.jpg" {
    const value: string
    export = value
}

declare module "*.jpeg" {
    const value: string
    export = value
}

declare module "*.gif" {
    const value: string
    export = value
}

declare module "*.webp" {
    const value: string
    export = value
}

declare module "*.vert" {
    const value: string
    export = value
}

declare module "*.frag" {
    const value: string
    export = value
}

declare module "*.md" {
    const value: string
    export = value
}

declare module "*.py" {
    const value: string
    export = value
}

declare module "*.sh" {
    const value: string
    export = value
}

declare module "*.txt" {
    const value: string
    export = value
}

declare module "*.bin" {
    const value: string
    export = value
}
