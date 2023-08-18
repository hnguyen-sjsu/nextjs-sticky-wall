'use client'
import { SideBarContext } from '@/contexts/SideBarContext'
import React, { useContext } from 'react'
import { RiMenuLine } from 'react-icons/ri'

const SideBarToggleButton = () => {
    const { toggleShow } = useContext(SideBarContext)
    return (
        <button
            type='button'
            className='p-2 rounded-full bg-black/5 hover:bg-black/20'
            onClick={toggleShow}
        >
            <RiMenuLine size={20} />
        </button>
    )
}

export default SideBarToggleButton
