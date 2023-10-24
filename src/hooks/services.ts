import React from "react"

import Service from "../service"

export const ServicesContext = React.createContext<Service | null>(null)

export function useServices(): Service {
    const services = React.useContext(ServicesContext)
    if (!services)
        throw Error(
            "<ServicesContext.Provider /> is missing int the nodes hierarchy!"
        )

    return services
}
