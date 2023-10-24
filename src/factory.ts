import { State } from "./data"
import Service from "./service/service"

const DPI = 300
const INCH_PER_CM = 0.393701
const WIDTH_IN_CM = 16.089
const HEIGHT_IN_CM = 11.217
const WIDTH = DPI * WIDTH_IN_CM * INCH_PER_CM
const HEIGHT = DPI * HEIGHT_IN_CM * INCH_PER_CM

const imagesCache = new Map<string, HTMLImageElement>()

export async function makeBackground(
    service: Service,
    state: State,
    root: string
): Promise<HTMLCanvasElement> {
    const [canvas, ctx] = createCanvas()
    const path = `${root}/input/sketch.jpg`
    const background =
        imagesCache.get(path) ?? (await service.bitmap.loadImage(path))
    imagesCache.set(path, background)
    const scale = HEIGHT / background.height
    const w = background.width * scale
    const h = background.height * scale
    const shiftX = state.position === "L" ? 0 : canvas.width - w
    ctx.drawImage(background, shiftX, 0, w, h)
    const size = WIDTH * 0.1
    const shadow = size * 0.2
    const txt = `${state.index + 1}`
    ctx.font = `${size}px sans-serif`
    const x = (WIDTH - ctx.measureText(txt).width) / 2
    ctx.fillStyle = "#000"
    ctx.fillText(txt, x - shadow, size + shadow)
    ctx.fillStyle = "#0f0"
    ctx.fillText(txt, x, size)
    return canvas
}

function createCanvas(): [
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
] {
    const canvas = document.createElement("canvas")
    canvas.width = WIDTH
    canvas.height = HEIGHT
    const ctx = canvas.getContext("2d")
    if (!ctx) throw Error("Unable to get a 2D context!")

    return [canvas, ctx]
}
