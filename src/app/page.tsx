import React from "react"
import { ViewButton, ViewPanel } from "@tolokoban/ui"

import { useServices } from "../hooks/services"
import { State, computeData } from "../data"
import { makeBackground } from "../factory"

import Styles from "./page.module.css"

export default function Page() {
    const [progress, setProgress] = React.useState(-1)
    const [states, setStates] = React.useState<State[]>([])
    React.useEffect(() => {
        setStates(computeData())
    }, [])
    const service = useServices()
    const handleStart = async () => {
        const folders = await service.browse.openDirectory({
            title: "Folder where to put the generated images",
            multiselections: false,
        })
        const [root] = folders
        if (!root) return

        for (let index = 0; index < states.length; index++) {
            const state = states[index]
            setProgress(state.index)
            const backgroundFilename = `${root}/output/back-${index}.jpg`
            const backgroundCanvas = await makeBackground(service, state, root)
            await service.bitmap.saveCanvas(
                backgroundFilename,
                backgroundCanvas
            )
            setProgress(state.index + 1)
        }
    }
    return (
        <ViewPanel className={Styles.Root} color="neutral-1">
            <ViewButton onClick={handleStart} enabled={progress < 0}>
                Start images generation
            </ViewButton>
            {progress > -1 && (
                <div>
                    <b>{progress + 1}</b> / {states.length + 1}
                </div>
            )}
        </ViewPanel>
    )
}
