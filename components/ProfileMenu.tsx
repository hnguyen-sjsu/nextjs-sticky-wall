'use client'
import { SessionInterface } from '@/common.types'
import { Menu, Transition } from '@headlessui/react'
import Image from 'next/image'
import AuthProviders from './AuthProviders'
import { Fragment } from 'react'
import { RiLogoutBoxLine } from 'react-icons/ri'
import { signOut } from 'next-auth/react'

const ProfileMenu = ({ session }: { session: SessionInterface }) => {
    const handleSignOutBtnClick = () => {
        signOut()
    }

    if (session)
        return (
            <>
                {session?.user?.image && (
                    <Image
                        src={session?.user?.image}
                        height={40}
                        width={40}
                        alt='Profile Image'
                        className='rounded-full'
                    />
                )}
            </>
        )
    // return (
    //     <div className='fixed'>
    //         <Menu as='div' className='relative inline-block'>
    //             <div>
    //                 <Menu.Button className='inline-flex'>
    //                     {session?.user?.image && (
    //                         <Image
    //                             src={session?.user?.image}
    //                             height={40}
    //                             width={40}
    //                             alt='Profile Image'
    //                             className='rounded-full'
    //                         />
    //                     )}
    //                 </Menu.Button>
    //             </div>
    //             <Transition
    //                 as={Fragment}
    //                 enter='transition ease-out duration-100'
    //                 enterFrom='transform opacity-0 scale-95'
    //                 enterTo='transform opacity-100 scale-100'
    //                 leave='transition ease-in duration-75'
    //                 leaveFrom='transform opacity-100 scale-100'
    //                 leaveTo='transform opacity-0 scale-95'
    //             >
    //                 <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
    //                     <div className='p-2'>
    //                         <div className='p-4'>
    //                             <h1 className='font-semibold text-center w-full'>
    //                                 {session?.user?.name}
    //                             </h1>
    //                             <h1>{session?.user?.email}</h1>
    //                         </div>
    //                         <Menu.Item>
    //                             {({ active }) => (
    //                                 <button
    //                                     type='button'
    //                                     className={`${
    //                                         active
    //                                             ? 'text-gray-500 bg-slate-200'
    //                                             : 'text-gray-900'
    //                                     } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
    //                                     onClick={handleSignOutBtnClick}
    //                                 >
    //                                     <div className='flexStart gap-2'>
    //                                         <RiLogoutBoxLine size={15} />
    //                                         <span className='font-semibold'>
    //                                             Sign Out
    //                                         </span>
    //                                     </div>
    //                                 </button>
    //                             )}
    //                         </Menu.Item>
    //                     </div>
    //                 </Menu.Items>
    //             </Transition>
    //         </Menu>
    //     </div>
    // )
    else {
        return <AuthProviders />
    }
}

export default ProfileMenu
