'use client'
import { useState, useEffect, useRef } from 'react'
import NoteCard from './NoteCard'
import { NoteInterface, SessionInterface } from '@/common.types'
import NoteFormModal from './NoteFormModal'
import { RiAddFill, RiMoreLine } from 'react-icons/ri'
import { deleteNote, updateNoteItem } from '@/libs/actions'

type Props = {
    notes: Array<NoteInterface>
    onNotesUpdated: (notes: Array<NoteInterface>) => void
    session: SessionInterface
    showAddButton?: boolean
    onLoadMoreClick?: () => void
    total?: number
}

const NoteGrid = ({
    notes,
    onNotesUpdated,
    session,
    showAddButton,
    onLoadMoreClick,
    total = 0,
}: Props) => {
    const [showModal, setShowModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isInView, setIsInView] = useState(false)
    const [selectedNote, setSelectedNote] = useState<NoteInterface | undefined>(
        undefined
    )

    const containerRef = useRef<HTMLDivElement>(null)

    const handleNoteItemClick = (id: string) => {
        const note = notes?.filter((i) => i._id === id)[0]
        if (note) {
            setSelectedNote(note)
            setShowModal(true)
        }
    }

    const handleModalClose = () => {
        setSelectedNote(undefined)
        setShowModal(false)
    }

    const handleNoteItemBgColorChanged = async (
        id: string,
        newBgColor: string
    ) => {
        const updatedNote = notes.filter((item) => item._id === id)[0]

        if (updatedNote) {
            const updatedNotes = notes.map((item) =>
                item._id === id ? { ...item, bgColor: newBgColor } : item
            )
            await updateNoteItem({ ...updatedNote, bgColor: newBgColor }, id)
            onNotesUpdated(updatedNotes)
        }
    }

    const handleNoteItemDeleted = async (id: string) => {
        const noteItem = notes.filter((item) => item._id === id)[0]

        if (noteItem) {
            await deleteNote(id)
            const updatedNotes = notes.filter((item) => item._id !== id)
            onNotesUpdated(updatedNotes)
        }
    }

    const handleNoteItemSaved = (
        noteItem: NoteInterface,
        type: 'create' | 'update'
    ) => {
        if (type === 'create') {
            onNotesUpdated([noteItem, ...notes])
        }

        if (type === 'update') {
            const updatedNotes = notes.map((item) =>
                item._id === noteItem._id ? { ...noteItem } : item
            )
            onNotesUpdated(updatedNotes)
        }
    }

    const handleNoteItemPinClick = async (id: string) => {
        const noteItem = notes.filter((item) => item._id === id)[0]

        if (noteItem) {
            const updatedNoteItem = await updateNoteItem(
                { ...noteItem, isPinned: !noteItem.isPinned },
                id
            )
            const updatedNotes = notes.map((item) =>
                item._id === id ? updatedNoteItem : item
            )
            onNotesUpdated(updatedNotes)
        }
    }

    const handleNoteItemArchiveClick = async (id: string) => {
        const noteItem = notes.filter((item) => item._id === id)[0]

        if (noteItem) {
            const updatedNoteItem = await updateNoteItem(
                { ...noteItem, isArchived: !noteItem.isArchived },
                id
            )
            const updatedNotes = notes.map((item) =>
                item._id === id ? updatedNoteItem : item
            )
            onNotesUpdated(updatedNotes)
        }
    }

    const handleScroll = () => {
        if (containerRef.current && typeof window !== 'undefined') {
            const container = containerRef.current
            const { bottom } = container.getBoundingClientRect()
            const { innerHeight } = window
            setIsInView((prev) => bottom <= innerHeight)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, true)

        return () => window.removeEventListener('scroll', handleScroll, true)
    }, [])

    useEffect(() => {
        if (isInView) {
            onLoadMoreClick!()
        }
    }, [isInView])

    return (
        <>
            <div className='mx-auto h-full' ref={containerRef}>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-4 w-full'>
                    {showAddButton && (
                        <div>
                            <button
                                type='button'
                                className='p-16 bg-slate-200 rounded-xl hover:shadow-xl w-full h-full flexCenter'
                                onClick={() => setShowModal(true)}
                            >
                                <RiAddFill size={45} />
                            </button>
                        </div>
                    )}
                    {notes
                        .filter((noteItem) => noteItem.isPinned)
                        .map((noteItem) => (
                            <div key={noteItem._id}>
                                <NoteCard
                                    noteItem={noteItem}
                                    onNoteItemClick={handleNoteItemClick}
                                    onBackgroundColorChanged={
                                        handleNoteItemBgColorChanged
                                    }
                                    onNoteItemPinClick={handleNoteItemPinClick}
                                    onNoteItemArchiveClick={
                                        handleNoteItemArchiveClick
                                    }
                                    onNoteItemDeleteClick={
                                        handleNoteItemDeleted
                                    }
                                />
                            </div>
                        ))}
                    {notes
                        .filter((noteItem) => !noteItem.isPinned)
                        .map((noteItem) => (
                            <div key={noteItem._id}>
                                <NoteCard
                                    noteItem={noteItem}
                                    onNoteItemClick={handleNoteItemClick}
                                    onBackgroundColorChanged={
                                        handleNoteItemBgColorChanged
                                    }
                                    onNoteItemPinClick={handleNoteItemPinClick}
                                    onNoteItemArchiveClick={
                                        handleNoteItemArchiveClick
                                    }
                                    onNoteItemDeleteClick={
                                        handleNoteItemDeleted
                                    }
                                />
                            </div>
                        ))}
                    {notes.length < total && (
                        <div>
                            <button
                                type='button'
                                className='p-16 bg-slate-200 rounded-xl hover:shadow-xl w-full h-full flexCenter font-semibold text-xs'
                                onClick={onLoadMoreClick}
                            >
                                <RiMoreLine size={45} />
                            </button>
                        </div>
                    )}
                </div>
                {showModal && (
                    <NoteFormModal
                        session={session}
                        note={selectedNote}
                        onDismiss={handleModalClose}
                        onNoteItemSaved={handleNoteItemSaved}
                        onBackgroundColorChanged={handleNoteItemBgColorChanged}
                        onNoteItemPinClick={handleNoteItemPinClick}
                        onNoteItemArchiveClick={handleNoteItemArchiveClick}
                        onNoteItemDeleteClick={handleNoteItemDeleted}
                    />
                )}
            </div>
        </>
    )
}

export default NoteGrid
