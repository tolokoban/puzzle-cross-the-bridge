# puzzle-cross-the-bridge
Four people have to cross a bridge in 17 minutes.
* The first one can cross the bridge in 1 minute,
* the second one in 2 minutes,
* the third in 5 minutes
* and the last one in 10 minutes.

A maximum of two persons can cross the bridge.
It is night and there is only one lamp.
When two people cross the bridge together, they do it at the pace of the slower.

How can you make them cross in 17 minutes?

----

This Node.js script gives you two solutions:

```js
/**
 * type ICost = number
 * type IGroup = number[]
 * type IState = [IGroup, IGroup, ICost]
 * type IStates = Array<IState>
 */
const STATES = [
    [[1,2,5,10], [], 0]
]

const MAX_ALLOWED_COST = 17
let bestCost = MAX_ALLOWED_COST * 2

function getLastElement(elements) {
    return elements[elements.length - 1]
}

function padLeft(txt) {
    while (txt.length < 12) {
        txt = `${txt} `
    }
    return txt
}

function padRight(txt) {
    while (txt.length < 12) {
        txt = ` ${txt}`
    }
    return txt
}

function printSolution(states) {
    console.log()
    console.log("Solution:")
    console.log("---------")
    for (let state of states) {
        const [groupAtStart, groupAtEnd, cost] = state
        bestCost = cost
        console.log(padLeft(groupAtStart), padRight(groupAtEnd), "  Cost:", cost)
    }
    console.log()
}

function moveToEnd(states) {
    const [groupAtStart, groupAtEnd, cost] = getLastElement(states)
    if (cost > bestCost) return

    if (groupAtStart.length === 1) {
        const timeToCross = groupAtStart[0]
        states.push([[], [1,2,5,10], cost + timeToCross])
        moveToStart(states)
        states.pop()
        return
    }
    for (let firstManIndex = 0 ; firstManIndex < groupAtStart.length - 1 ; firstManIndex++) {
        const timeToCrossForFirstMan = groupAtStart[firstManIndex]
        for (let secondManIndex = firstManIndex + 1 ; secondManIndex < groupAtStart.length ; secondManIndex++) {
            const timeToCrossForSecondMan = groupAtStart[secondManIndex]
            const timeToCross = Math.max(timeToCrossForFirstMan, timeToCrossForSecondMan)
            const nextGroupAtStart = groupAtStart
                .filter(time => time !== timeToCrossForFirstMan && time !== timeToCrossForSecondMan)
            const nextGroupAtEnd = groupAtEnd.slice()
            nextGroupAtEnd.push(timeToCrossForFirstMan, timeToCrossForSecondMan)
            states.push([nextGroupAtStart, nextGroupAtEnd, cost + timeToCross])
            moveToStart(states)
            states.pop()
        }
    }
}

function moveToStart(states) {
    const [groupAtStart, groupAtEnd, cost] = getLastElement(states)

    if (cost > bestCost) return
    if (groupAtStart.length === 0) {
        printSolution(states)
        return
    }

    for (let firstManIndex = 0 ; firstManIndex < groupAtEnd.length ; firstManIndex++) {
        const timeToCrossForFirstMan = groupAtEnd[firstManIndex]
        const nextCost = cost + timeToCrossForFirstMan
        const nextGroupAtEnd = groupAtEnd.filter(time => time !== timeToCrossForFirstMan)
        const nextGroupAtStart = groupAtStart.slice()
        nextGroupAtStart.push(timeToCrossForFirstMan)
        states.push([nextGroupAtStart, nextGroupAtEnd, nextCost])
        moveToEnd(states)
        states.pop()
    }
}


moveToEnd(STATES)
```
