'use client'
import { NoteInterface } from '@/common.types'
import { useState } from 'react'

import {
    RiPushpin2Fill,
    RiPushpin2Line,
    RiDeleteBinLine,
    RiInboxArchiveLine,
    RiInboxUnarchiveLine,
} from 'react-icons/ri'
import BackgroundColorPicker from './BackgroundColorPicker'
import { backgroundColors } from '@/constants'
import { joinClassNames } from '@/utils'
import NoteLabels from './NoteLabels'

type Props = {
    noteItem: NoteInterface
    onNoteItemClick: (id: string) => void
    onBackgroundColorChanged: (id: string, newBgColor: string) => void
    onNoteItemPinClick: (id: string) => void
    onNoteItemArchiveClick: (id: string) => void
    onNoteItemDeleteClick: (id: string) => void
}

const getBackgroundColor = (colorName: string) => {
    const color = backgroundColors.filter((c) => c.name === colorName)[0]
    return color.className
}

const NoteCard = ({
    noteItem,
    onNoteItemClick,
    onBackgroundColorChanged,
    onNoteItemPinClick,
    onNoteItemArchiveClick,
    onNoteItemDeleteClick,
}: Props) => {
    const [isClicked, setIsClicked] = useState(false)

    const handleNoteItemClick = (e: React.MouseEvent) => {
        e.preventDefault()
        onNoteItemClick(noteItem._id as string)
    }

    const handleBackgroundColorChanged = (newBgColor: string) => {
        onBackgroundColorChanged(noteItem._id as string, newBgColor)
    }

    const handlePinBtnClick = () => {
        onNoteItemPinClick(noteItem._id as string)
    }

    const handleArchiveBtnClick = () => {
        onNoteItemArchiveClick(noteItem._id as string)
    }

    const handleDeleteBtnClick = () => {
        onNoteItemDeleteClick(noteItem._id as string)
    }

    return (
        <div
            className={joinClassNames(
                'sticky_note-container h-full group',
                isClicked ? 'opacity-0' : 'opacity-100',
                getBackgroundColor(noteItem.bgColor)
            )}
        >
            <div className='flexBetween gap-2'>
                <div className='flexStart'>
                    <div
                        onClick={handleNoteItemClick}
                        className='cursor-pointer w-full'
                    >
                        {noteItem.title && (
                            <label className='font-semibold text-lg'>
                                {noteItem.title}
                            </label>
                        )}
                    </div>
                </div>
                <div
                    className={joinClassNames(
                        'flexEnd gap-2',
                        noteItem.isPinned ? '' : 'invisible group-hover:visible'
                    )}
                >
                    <button
                        type='button'
                        className='sticky_note-action-btn'
                        onClick={handlePinBtnClick}
                    >
                        {noteItem.isPinned ? (
                            <RiPushpin2Fill size={15} />
                        ) : (
                            <RiPushpin2Line size={15} />
                        )}
                    </button>
                </div>
            </div>
            <div
                onClick={handleNoteItemClick}
                className='cursor-pointer h-full'
            >
                <pre className='break-all'>{noteItem.content}</pre>
            </div>
            <div className='flex'>
                <NoteLabels labels={noteItem.labels || []} />
            </div>
            <div className='invisible group-hover:visible peer-focus:visible flexBetween'>
                <div className='flexStart gap-2'>
                    <BackgroundColorPicker
                        selectedColor={noteItem.bgColor}
                        onBackgroundColorChanged={handleBackgroundColorChanged}
                    />
                </div>
                <div className='flexEnd gap-2'>
                    <button
                        type='button'
                        className='sticky_note-action-btn'
                        onClick={handleArchiveBtnClick}
                    >
                        {noteItem.isArchived ? (
                            <RiInboxUnarchiveLine size={15} />
                        ) : (
                            <RiInboxArchiveLine size={15} />
                        )}
                    </button>
                    <button
                        type='button'
                        className='sticky_note-action-btn'
                        onClick={handleDeleteBtnClick}
                    >
                        <RiDeleteBinLine size={15} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NoteCard
