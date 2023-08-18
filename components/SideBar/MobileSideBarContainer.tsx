'use client'
import { SideBarContext } from '@/contexts/SideBarContext'
import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useContext } from 'react'
import { RiCloseFill } from 'react-icons/ri'
import SideBar from './SideBar'
import { SessionInterface } from '@/common.types'

const MobileSideBarContainer = ({ session }: { session: SessionInterface }) => {
    const { show, toggleShow } = useContext(SideBarContext)

    const toggleSideBar = (value: boolean) => {
        toggleShow!()
    }

    return (
        <div>
            <Transition.Root show={show} as={Fragment}>
                <Dialog
                    as='div'
                    className='relative z-10 lg:hidden'
                    onClose={toggleSideBar}
                >
                    <Transition.Child
                        as={Fragment}
                        enter='transition-opacity ease-linear duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='transition-opacity ease-linear duration-300'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <div className='fixed inset-0 bg-black bg-opacity-25' />
                    </Transition.Child>
                    <div className='fixed inset-0 z-40 flex'>
                        <Transition.Child
                            as={Fragment}
                            enter='transition ease-in-out duration-300 transform'
                            enterFrom='-translate-x-full'
                            enterTo='translate-x-0'
                            leave='transition ease-in-out duration-300 transform'
                            leaveFrom='translate-x-0'
                            leaveTo='-translate-x-full'
                        >
                            <Dialog.Panel className='relative mr-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 mt-4 rounded-r-2xl'>
                                <div className='flex items-center justify-between px-4'>
                                    <h2 className='text-xl font-bold text-gray-900'>
                                        Sticky Wall
                                    </h2>
                                    <button
                                        type='button'
                                        className='-mr-2 flex h-10 w-10 items-center justify-center rounded-full p-2 text-gray-400 bg-black/5'
                                        onClick={() => toggleSideBar(false)}
                                    >
                                        <RiCloseFill size={25} />
                                    </button>
                                </div>

                                <div className='p-4 divide-y divide-black/10'>
                                    <SideBar session={session} />
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    )
}

export default MobileSideBarContainer
