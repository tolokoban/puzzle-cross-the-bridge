const FS = require("fs")
const Path = require("path")

const ROOT = Path.resolve(__dirname, "..", "..")

/**
 * @param {string} file
 * @param {string} data
 * @param {string?} after
 * @param {string?} before
 */
function save(file, data, after="", before="") {
    const path = Path.resolve(ROOT, file)
    if (!after || !before) {
        FS.writeFileSync(path, data)
        return
    }
    const content = FS.readFileSync(path).toString()
    const start = content.indexOf(after)
    if (start < 0) {
        throw Error(`Unable to safe file "${file}":
Section beginning "${after}" not found!`)
    }
    const end = content.indexOf(before)
    if (start < 0) {
        throw Error(`Unable to safe file "${file}":
Section beginning "${before}" not found!`)
    }
    const newContent = `${
        content.substring(0, start + after.length)
    }${
        data
    }${
        content.substring(end)
    }`
    FS.writeFileSync(file, newContent)
}

module.exports = { save }
