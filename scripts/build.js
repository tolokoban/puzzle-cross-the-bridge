const { save } = require("./lib/save")

/**
 * @type {Array<[number[], number[], number, any[], string]>}
 */
const states = []
const keys = new Map()

/**
 * @param {number[]} left
 * @param {number[]} right
 * @param {number} time
 */
function makeKey(left, right, time) {
    const L = [...left].sort()
    const R = [...right].sort()
    return `${L.join(",")}|${R.join(",")}:${time}`
}

/**
 * @param {number[]} left
 * @param {number[]} right
 * @param {number} time
 */
function moveRight(left, right, time, indent = "") {
    const key = makeKey(left, right, time)
    if (keys.has(key)) return key

    const children = []
    /**
     * @type {[number[], number[], number, any[], string]}
     */
    const state = [left, right, time, children, "R"]
    keys.set(key, state)
    states.push(state)
    // console.log(indent, left, "...", right, "in", time, "  (right)")
    if (time >= 17) return key

    indent += " | "
    for (let a = 0; a < left.length; a++) {
        const tA = left[a]
        const newLeft = left.filter((_, index) => index !== a)
        const newRight = [tA, ...right]
        children.push([moveLeft(newLeft, newRight, time + tA, indent), tA])
        for (let b = a + 1; b < left.length; b++) {
            const tB = left[b]
            const newLeft = left.filter(
                (_, index) => index !== a && index !== b
            )
            const newRight = [tA, tB, ...right]
            children.push([
                moveLeft(newLeft, newRight, time + Math.max(tA, tB), indent),
                tA,
                tB,
            ])
        }
    }
    return key
}

/**
 * @param {number[]} left
 * @param {number[]} right
 * @param {number} time
 */
function moveLeft(left, right, time, indent = "") {
    const key = makeKey(left, right, time)
    if (keys.has(key)) return key

    const children = []
    /**
     * @type {[number[], number[], number, any[], string]}
     */
    const state = [left, right, time, children, "L"]
    keys.set(key, state)
    states.push(state)
    // console.log(indent, left, "...", right, "in", time, "  (right)")
    if (time >= 17) return key

    indent += " | "
    for (let a = 0; a < right.length; a++) {
        const tA = right[a]
        const newLeft = [...left, tA]
        const newRight = right.filter((_, index) => index !== a)
        children.push([moveRight(newLeft, newRight, time + tA, indent), tA])
        for (let b = a + 1; b < right.length; b++) {
            const tB = right[b]
            const newLeft = [...left, tA, tB]
            const newRight = right.filter(
                (_, index) => index !== a && index !== b
            )
            children.push([
                moveRight(newLeft, newRight, time + Math.max(tA, tB), indent),
                tA,
                tB,
            ])
        }
    }
    return key
}

moveRight([1, 2, 5, 10], [], 0)
for (let i = 1; i < states.length; i++) {
    const j = i + Math.floor(Math.random() * (states.length - i))
    const tmp = states[i]
    states[i] = states[j]
    states[j] = tmp
}
const pages = new Map()
states.forEach((state, index) => {
    const [left, right, time] = state
    const key = makeKey(left, right, time)
    pages.set(key, index)
})
console.log("")
console.log("Number of different steps:", states.length)
console.log("")

const pictures = ["left", "right"]
save(
    "template/template/META-INF/manifest.xml",
    [
        `<?xml version="1.0" encoding="UTF-8"?>`,
        `<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.3" xmlns:loext="urn:org:documentfoundation:names:experimental:office:xmlns:loext:1.0">`,
        `<manifest:file-entry manifest:full-path="/" manifest:version="1.3" manifest:media-type="application/vnd.oasis.opendocument.presentation"/>`,
        `<manifest:file-entry manifest:full-path="Configurations2/" manifest:media-type="application/vnd.sun.xml.ui.configuration"/>`,
        `<manifest:file-entry manifest:full-path="styles.xml" manifest:media-type="text/xml"/>`,
        `<manifest:file-entry manifest:full-path="content.xml" manifest:media-type="text/xml"/>`,
        `<manifest:file-entry manifest:full-path="meta.xml" manifest:media-type="text/xml"/>`,
        ...pictures.map(
            (name) =>
                `<manifest:file-entry manifest:full-path="Pictures/${name}.jpg" manifest:media-type="image/jpeg"/>`
        ),
        `<manifest:file-entry manifest:full-path="Thumbnails/thumbnail.png" manifest:media-type="image/png"/>`,
        `<manifest:file-entry manifest:full-path="settings.xml" manifest:media-type="text/xml"/>`,
        `</manifest:manifest>`,
    ].join("\n")
)

function getName(time) {
    switch (time) {
        case 1:
            return "Spit"
        case 2:
            return "Tyson"
        case 5:
            return "Balzac"
        default:
            return "Golgoth"
    }
}

/**
 * @param {Array<[key: string, ...people: number[]]>} routes
 * @returns {string}
 */
function getChoices(routes, pos) {
    return routes
        .map(([key, ...people]) =>
            [
                `      <text:p text:stype-name="Par-${pos}">`,
                `        <text:span texttext:style-name="Text">${people
                    .map(getName)
                    .join(" et ")} (${(pages.get(key) ?? -1) + 1})</text:span>`,
                `      </text:p>`,
            ].join("\n")
        )
        .sort((a, b) => a.length - b.length)
        .join("\n")
}

/**
 *
 * @param {Array<[number[], number[], number, any[], string]>} states
 * @param {number} index
 * @returns {string}
 */
function printPage(states, index) {
    const s1 = states[index]
    const s2 = states[index + 1]
    const pos1 = s1[4] === "L" ? "left" : "right"
    const pos2 = s2[4] === "L" ? "left" : "right"
    return [
        `<draw:page draw:name="page${
            (index >> 1) + 1
        }" draw:style-name="dp1" draw:master-page-name="Default">`,
        `  <draw:frame draw:layer="layout" svg:width="16.085cm" svg:height="11.217cm" svg:x="2.54cm" svg:y="2.108cm">`,
        `    <draw:image xlink:href="Pictures/${pos1}.jpg" xlink:type="simple" xlink:show="embed" xlink:actuate="onLoad" draw:mime-type="image/jpeg">`,
        `    </draw:image>`,
        `  </draw:frame>`,
        `  <draw:frame draw:style-name="box-${pos1}" draw:text-style-name="par-${pos1}" draw:layer="layout" svg:width="16.085cm" svg:height="11.217cm" svg:x="2.54cm" svg:y="2.108cm">`,
        `    <draw:text-box>`,
        getChoices(s1[3], pos1),
        `    </draw:text-box>`,
        `  </draw:frame>`,
        `  <draw:frame draw:layer="layout" svg:width="16.089cm" svg:height="11.217cm" svg:x="2.678cm" svg:y="16.51cm">`,
        `    <draw:image xlink:href="Pictures/${pos2}.jpg" xlink:type="simple" xlink:show="embed" xlink:actuate="onLoad" draw:mime-type="image/jpeg">`,
        `    </draw:image>`,
        `  </draw:frame>`,
        `  <draw:frame draw:style-name="box-${pos2}" draw:text-style-name="par-${pos1}" draw:layer="layout" svg:width="16.085cm" svg:height="11.217cm" svg:x="2.54cm" svg:y="16.51cm">`,
        `    <draw:text-box>`,
        getChoices(s2[3], pos2),
        `    </draw:text-box>`,
        `  </draw:frame>`,
        `</draw:page>`,
    ].join("\n")
}

save(
    "template/template/content.xml",
    [0, 2, 4, 6, 8, 10, 12, 14, 16]
        .map((index) => printPage(states, index))
        .join("\n"),
    "<office:presentation>",
    "</office:presentation>"
)
