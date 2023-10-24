/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/latest/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */
import React from "react"
import { createRoot } from "react-dom/client"
import { Theme } from "@tolokoban/ui"

import App from "./app"
import Service from "./service/service"
import { ServicesContext } from "./hooks/services"

import "./index.css"

function start() {
    console.log(
        '👋 This message is being logged by "renderer.js", included via webpack'
    )
    const theme = new Theme({
        colors: {
            input: "#eefe",
            neutral: { hue: 210, chroma: [5, 1], lightness: [20, 80] },
            primary: {
                hue: 210,
                chroma: [100, 80],
                lightness: [1, 30],
            },
            secondary: {
                hue: 72,
                chroma: [90, 100],
                lightness: [40, 75],
            },
            tertiary: {
                hue: [100, 100],
                chroma: [100, 120],
                lightness: [50, 120],
            },
        },
    })
    theme.apply()
    const service = new Service()
    const container = document.getElementById("app")
    const root = createRoot(container)
    root.render(
        <ServicesContext.Provider value={service}>
            <App />
        </ServicesContext.Provider>
    )
    removeSplashScreen()
}

function removeSplashScreen() {
    const SPLASH_VANISHING_DELAY = 900
    const splash = document.getElementById("tgd-logo")
    if (!splash) return

    splash.classList.add("vanish")
    window.setTimeout(() => {
        const parent = splash.parentNode
        if (!parent) return

        parent.removeChild(splash)
    }, SPLASH_VANISHING_DELAY)
}

start()
