export interface State {
    index: number
    left: number[]
    right: number[]
    time: number
    position: "R" | "L"
    children: Array<{
        index: number
        people: number[]
    }>
}

interface InternalState {
    key: string
    left: number[]
    right: number[]
    time: number
    position: "R" | "L"
    children: InternalStateChild[]
}

interface InternalStateChild {
    key: string
    people: number[]
}

export function computeData(): State[] {
    const computer = new Computer()
    const states = shuffle(computer.getStates())
    const indexes = new Map<string, number>()
    states.forEach(({ key }, index) => {
        indexes.set(key, index)
    })
    return states.map(({ left, right, time, children, position }, index) => ({
        index,
        left,
        right,
        time,
        position,
        children: children.map(({ key, people }) => ({
            index: indexes.get(key) ?? -1,
            people,
        })),
    }))
}

function shuffle(states: InternalState[]) {
    for (let i = 1; i < states.length; i++) {
        const j = i + Math.floor(Math.random() * (states.length - i))
        const tmp = states[i]
        states[i] = states[j]
        states[j] = tmp
    }
    return states
}

function makeKey(left: number[], right: number[], time: number): string {
    const L = [...left].sort()
    const R = [...right].sort()
    return `${L.join(",")}|${R.join(",")}:${time}`
}

class Computer {
    private readonly states: InternalState[] = []
    private readonly keys = new Map<string, InternalState>()

    constructor() {
        this.moveRight([1, 2, 5, 10], [], 0)
    }

    public getStates() {
        return [...this.states]
    }

    private moveRight(left: number[], right: number[], time: number) {
        const key = makeKey(left, right, time)
        if (this.keys.has(key)) return key

        const children: InternalStateChild[] = []
        const state: InternalState = {
            key,
            left,
            right,
            time,
            children,
            position: "L",
        }
        this.keys.set(key, state)
        this.states.push(state)
        if (time >= 17) return key

        for (let a = 0; a < left.length; a++) {
            const tA = left[a]
            const newLeft = left.filter((_, index) => index !== a)
            const newRight = [tA, ...right]
            children.push({
                key: this.moveLeft(newLeft, newRight, time + tA),
                people: [tA],
            })
            for (let b = a + 1; b < left.length; b++) {
                const tB = left[b]
                const newLeft = left.filter(
                    (_, index) => index !== a && index !== b
                )
                const newRight = [tA, tB, ...right]
                children.push({
                    key: this.moveLeft(
                        newLeft,
                        newRight,
                        time + Math.max(tA, tB)
                    ),
                    people: [tA, tB],
                })
            }
        }
        return key
    }

    private moveLeft(left: number[], right: number[], time: number) {
        const key = makeKey(left, right, time)
        if (this.keys.has(key)) return key

        const children: InternalStateChild[] = []
        const state: InternalState = {
            key,
            left,
            right,
            time,
            children,
            position: "R",
        }
        this.keys.set(key, state)
        this.states.push(state)
        if (time >= 17) return key

        for (let a = 0; a < right.length; a++) {
            const tA = right[a]
            const newLeft = [...left, tA]
            const newRight = right.filter((_, index) => index !== a)
            children.push({
                key: this.moveRight(newLeft, newRight, time + tA),
                people: [tA],
            })
            for (let b = a + 1; b < right.length; b++) {
                const tB = right[b]
                const newLeft = [...left, tA, tB]
                const newRight = right.filter(
                    (_, index) => index !== a && index !== b
                )
                children.push({
                    key: this.moveRight(
                        newLeft,
                        newRight,
                        time + Math.max(tA, tB)
                    ),
                    people: [tA, tB],
                })
            }
        }
        return key
    }
}
