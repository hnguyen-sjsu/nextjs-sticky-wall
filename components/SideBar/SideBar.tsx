'use client'
import { useContext } from 'react'
import {
    RiArchive2Fill,
    RiLogoutBoxLine,
    RiMenuFill,
    RiStickyNoteFill,
    RiBookmarkLine,
    RiEditFill,
    RiSearchLine,
} from 'react-icons/ri'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { joinClassNames } from '@/utils'
import { signOut } from 'next-auth/react'

import { SessionInterface } from '@/common.types'
import AuthProviders from '../AuthProviders'
import { LabelModalContext } from '@/contexts/LabelModalContext'

const SideBar = ({ session }: { session: SessionInterface }) => {
    const pathName = usePathname()
    const labelModalContext = useContext(LabelModalContext)

    const menuItems = [
        { title: 'Notes', link: '/', icon: <RiStickyNoteFill size={20} /> },
        {
            title: 'Archive',
            link: '/archive',
            icon: <RiArchive2Fill size={20} />,
        },
    ]

    const handleShowLabelModalClick = () => {
        labelModalContext.toggleShow!()
    }

    return (
        <>
            <div className='flex flex-col'>
                <div className='max-sm:hidden menu_wrapper'>
                    <span className='menu_title'>Menu</span>
                    <button className='menu_btn'>
                        <RiMenuFill size={22} />
                    </button>
                </div>

                {session && (
                    <div className='mt-4 px-2 divide-y divide-black/10'>
                        <Link href='/search'>
                            <div className='menu_item_wrapper'>
                                <div className='menu_item_icon'>
                                    <RiSearchLine size={20} />
                                </div>
                                <span className='menu_item_label'>Search</span>
                            </div>
                        </Link>
                        <div>
                            <ul className='my-4'>
                                {menuItems.map((item) => (
                                    <li key={item.title}>
                                        <Link href={item.link}>
                                            <div
                                                className={joinClassNames(
                                                    'menu_item_wrapper',
                                                    pathName === item.link &&
                                                        'menu_item_wrapper-active'
                                                )}
                                            >
                                                <div className='menu_item_icon'>
                                                    {item.icon}
                                                </div>
                                                <span className='menu_item_label'>
                                                    {item.title}
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <div className='section_title'>
                                <h2>Lists</h2>
                            </div>
                            <ul className='mb-4'>
                                {labelModalContext.labels.map((item) => (
                                    <li key={item._id}>
                                        <Link href={`/list/${item._id}`}>
                                            <div
                                                className={joinClassNames(
                                                    'menu_item_wrapper',
                                                    pathName ===
                                                        `/list/${item._id?.toString()}` &&
                                                        'menu_item_wrapper-active'
                                                )}
                                            >
                                                <div className='menu_item_icon'>
                                                    <RiBookmarkLine size={20} />
                                                </div>
                                                <span className='menu_item_label'>
                                                    {item.title}
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                                <li>
                                    <button
                                        className='menu_item_wrapper w-full'
                                        onClick={handleShowLabelModalClick}
                                    >
                                        <div className='menu_item_icon'>
                                            <RiEditFill size={20} />
                                        </div>
                                        <span className='menu_item_label'>
                                            Edit Labels
                                        </span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div className='flex flex-col flex-grow'></div>
                    </div>
                )}

                {!session && (
                    <div className='mt-4 px-2 divide-y divide-black/10'>
                        <AuthProviders />
                    </div>
                )}
            </div>
            <div className='flex flex-col flex-grow'></div>
            <div className='flex flex-col'>
                {session && (
                    <div className='my-2 px-2'>
                        <button
                            type='button'
                            className='menu_item_wrapper hover:bg-gray/50 signout_btn w-full'
                            onClick={() => signOut()}
                        >
                            <div className='menu_item_icon'>
                                <RiLogoutBoxLine size={20} />
                            </div>
                            <span className='menu_item_label'>Sign Out</span>
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}

export default SideBar
