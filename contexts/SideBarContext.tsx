'use client'
import { ISideBarContext } from '@/common.types'
import { ReactNode, createContext, useState } from 'react'

export const SideBarContext = createContext<ISideBarContext>({
    show: false,
})

const SideBarProvider = ({ children }: { children: ReactNode }) => {
    const [show, setShow] = useState(false)

    const toggleShow = () => {
        setShow(!show)
    }

    return (
        <SideBarContext.Provider value={{ show, toggleShow }}>
            {children}
        </SideBarContext.Provider>
    )
}

export default SideBarProvider
