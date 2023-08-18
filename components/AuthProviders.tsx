'use client'

import { useState, useEffect } from 'react'
import { getProviders, signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
type Provider = {
    id: string
    name: string
    type: string
    signinUrl: string
    callbackUrl: string
    signinUrlParams?: Record<string, string> | undefined
}

type Providers = Record<string, Provider>

const AuthProviders = () => {
    const [providers, setProviders] = useState<Providers | null>(null)

    useEffect(() => {
        const fetchProviders = async () => {
            const res = await getProviders()
            setProviders(res)
        }

        fetchProviders()
    }, [])

    if (providers) {
        return (
            <div>
                {Object.values(providers).map((provider: Provider, i) => (
                    <button
                        type='button'
                        className='menu_item_wrapper hover:bg-white hover:text-black ring-inset ring-black/20 ring-1 w-full flexCenter'
                        onClick={() => signIn(provider?.id)}
                        key={provider?.id}
                    >
                        <div className='menu_item_icon'>
                            <FcGoogle size={20} />
                        </div>
                        <span className='menu_item_label'>
                            Sign In with Google
                        </span>
                    </button>
                ))}
            </div>
        )
    }
}

export default AuthProviders
