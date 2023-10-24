import { getExtension } from "../utils/path"

export default class BitmapService {
    constructor(private readonly fs: ApiInterface["fs"]) {}

    async loadCanvas(path: string): Promise<HTMLCanvasElement> {
        const image = await this.loadImage(path)
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        if (!ctx) throw Error("Unable to create context 2d!")

        canvas.width = image.width
        canvas.height = image.height
        ctx.drawImage(image, 0, 0)
        return canvas
    }

    async saveCanvas(path: string, canvas: HTMLCanvasElement): Promise<void> {
        return new Promise(resolve => {
            canvas.toBlob(
                blob => {
                    blob.arrayBuffer()
                        .then(buff => buff)
                        .then(buff => this.fs.writeBinary(path, buff))
                        .then(resolve)
                        .catch(console.error)
                },
                `image/${path.endsWith(".jpg") ? "jpeg" : "png"}`,
                1
            )
        })
    }

    async loadImage(path: string): Promise<HTMLImageElement> {
        const buff = await this.fs.readBinary(path)
        const type = `image/${getExtension(path)}`
        const blob = new Blob([buff], { type })
        const url = URL.createObjectURL(blob)
        return this.loadImageFromURL(url)
    }

    async loadImageFromURL(url: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.src = url
            img.onload = () => resolve(img)
            img.onerror = reject
        })
    }
}
