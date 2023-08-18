import React from 'react'
import AuthProviders from './AuthProviders'
import { RiStickyNoteFill } from 'react-icons/ri'

const SignIn = () => {
    return (
        <div className='absolute inset-0 w-full'>
            <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
                <div className='sm:mx-auto sm:w-full sm:max-w-sm bg-white py-16 px-8 rounded-2xl shadow-2xl'>
                    <div className='text-yellow-400 flexCenter'>
                        <RiStickyNoteFill size={100} />
                    </div>
                    <h2 className='mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900'>
                        Sticky Wall
                    </h2>
                    <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                        <AuthProviders />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn
