import React from 'react'
import AuthProviders from './AuthProviders'

const Navbar = () => {
    const session = null
    return (
        <div>
            <h1 className='font-bold text-2xl'>Sticky Wall</h1>
            <AuthProviders />
        </div>
    )
}

export default Navbar
