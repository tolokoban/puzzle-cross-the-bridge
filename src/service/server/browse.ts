import Electron from "electron"

export interface BrowseOpenOptions {
    path: string
    title: string
    filters: BrowserFilter[]
    multiSelections: boolean
}

type BrowserProperty =
    | "openFile"
    | "openDirectory"
    | "multiSelections"
    | "showHiddenFiles"
    | "createDirectory"
    | "promptToCreate"
    | "noResolveAliases"
    | "treatPackageAsDirectory"
    | "dontAddToRecent"

interface BrowserFilter {
    name: string
    extensions: string[]
}

export default {
    async openFile({
        path = ".",
        title = "Please select a file",
        filters = [],
        multiSelections = false,
    }: Partial<BrowseOpenOptions>): Promise<string[]> {
        const properties: BrowserProperty[] = ["openFile"]
        if (multiSelections) properties.push("multiSelections")
        const { canceled, filePaths } = await Electron.dialog.showOpenDialog({
            defaultPath: path,
            title,
            properties,
            filters,
        })
        if (canceled) return []

        return filePaths
    },
    async openDirectory({
        path = ".",
        title = "Please select a directory",
        filters = [],
        multiSelections = false,
    }: Partial<BrowseOpenOptions>): Promise<string[]> {
        const properties: BrowserProperty[] = ["openDirectory"]
        if (multiSelections) properties.push("multiSelections")
        const { canceled, filePaths } = await Electron.dialog.showOpenDialog({
            defaultPath: path,
            title,
            properties,
            filters,
        })
        if (canceled) return []

        return filePaths
    },
}
