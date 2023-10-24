export async function save(
    dirHandle: FileSystemDirectoryHandle,
    name: string,
    content: FileSystemWriteChunkType
): Promise<void> {
    const file = await dirHandle.getFileHandle(name, {
        create: true,
    })
    const writable = await file.createWritable()
    await writable.write(content)
    await writable.close()
}
