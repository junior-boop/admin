"use client"

import { createContext } from "react"

const GlobalContext = createContext(null)

export default function GlobalContextProvide(){
    return(
        <GlobalContext value = {{
            
        }}>

        </GlobalContext>
    )
}