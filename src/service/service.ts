import BitmapService from "./bitmap"

export default class Service implements ApiInterface {
    public readonly browse: ApiInterface["browse"]

    public readonly fs: ApiInterface["fs"]

    public readonly bitmap: BitmapService

    constructor() {
        console.log("🚀 [service] window.API = ", window.API) // @FIXME: Remove this line written on 2023-03-06 at 14:46
        this.browse = window.API.browse
        this.fs = window.API.fs
        this.bitmap = new BitmapService(window.API.fs)
    }
}
