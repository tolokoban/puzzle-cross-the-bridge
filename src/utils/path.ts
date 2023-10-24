export function getExtension(path: string): string {
    const pos = path.lastIndexOf(".")
    return path.substring(pos + 1)
}

export function replaceExtension(path: string, newExtension: string): string {
    const oldExtension = getExtension(path)
    return `${path.substring(
        0,
        path.length - oldExtension.length
    )}${newExtension}`
}
