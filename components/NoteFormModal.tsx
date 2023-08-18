'use client'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
    createNewNote,
    deleteNote,
    fetchToken,
    updateNoteItem,
} from '@/libs/actions'
import { ILabel, NoteInterface, SessionInterface } from '@/common.types'
import {
    RiPushpin2Fill,
    RiPushpin2Line,
    RiDeleteBinLine,
    RiInboxArchiveLine,
    RiInboxUnarchiveLine,
    RiCloseFill,
} from 'react-icons/ri'
import { joinClassNames } from '@/utils'
import { backgroundColors } from '@/constants'
import BackgroundColorPicker from './BackgroundColorPicker'
import LabelPicker from './LabelModal/LabelPicker'
import NoteLabels from './NoteLabels'

type Props = {
    session: SessionInterface
    note?: NoteInterface
    onDismiss: () => void
    onNoteItemSaved: (
        noteItem: NoteInterface,
        type: 'create' | 'update'
    ) => void
    onBackgroundColorChanged: (id: string, newBgColor: string) => void
    onNoteItemPinClick: (id: string) => void
    onNoteItemArchiveClick: (id: string) => void
    onNoteItemDeleteClick: (id: string) => void
}

const NoteFormModal = ({
    session,
    note,
    onDismiss,
    onNoteItemSaved,
    onBackgroundColorChanged,
    onNoteItemPinClick,
    onNoteItemArchiveClick,
    onNoteItemDeleteClick,
}: Props) => {
    let [isOpen, setIsOpen] = useState(true)

    function closeModal() {
        setIsOpen(false)
        onDismiss()
    }

    function openModal() {
        setIsOpen(true)
    }

    const handleDelete = async () => {
        setIsSubmitting(true)

        const { token } = await fetchToken()

        try {
            if (note?._id) {
                deleteNote(note?._id)
                onNoteItemDeleteClick(note?._id)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsSubmitting(false)
            onDismiss()
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setIsSubmitting(true)

        const { token } = await fetchToken()

        try {
            if (noteItem.title || noteItem.content) {
                if (note?._id) {
                    // Update note
                    const res = await updateNoteItem(noteItem, note?._id)
                    onNoteItemSaved(
                        { ...res, labels: noteItem.labels },
                        'update'
                    )
                } else {
                    // Create new note
                    const res = await createNewNote(session?.user?.id, noteItem)
                    onNoteItemSaved(
                        { ...res, labels: noteItem.labels },
                        'create'
                    )
                }
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsSubmitting(false)
            closeModal()
        }
    }

    const handleBackgroundColorChanged = (newBgColor: string) => {
        setNoteItem({ ...noteItem, bgColor: newBgColor })

        if (noteItem._id) {
            onBackgroundColorChanged(noteItem._id as string, newBgColor)
        }
    }

    const handlePinBtnClick = () => {
        setNoteItem({ ...noteItem, isPinned: !noteItem.isPinned })
        if (noteItem._id) {
            onNoteItemPinClick(noteItem._id as string)
        }
    }

    const handleArchiveBtnClick = () => {
        setNoteItem({ ...noteItem, isArchived: !noteItem.isArchived })
        if (noteItem._id) {
            onNoteItemArchiveClick(noteItem._id as string)
        }
        closeModal()
    }

    const handleStateChange = (fieldName: string, value: string) => {
        setNoteItem((prevState: any) => ({ ...prevState, [fieldName]: value }))
    }

    const handleLabelsSelected = (selectedLabels: Array<ILabel>) => {
        console.log(selectedLabels)
        setNoteItem({ ...noteItem, labels: selectedLabels })
    }

    const [noteItem, setNoteItem] = useState<NoteInterface>({
        _id: note?._id || '',
        title: note?.title || '',
        content: note?.content || '',
        bgColor: note?.bgColor || 'yellow',
        isPinned: note?.isPinned || false,
        isArchived: note?.isArchived || false,
        createdBy: note?.createdBy,
        labels: note?.labels || [],
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as='div' className='relative z-10' onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm' />
                </Transition.Child>

                <div className='fixed inset-0 overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text-center'>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 scale-95'
                            enterTo='opacity-100 scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-95'
                        >
                            <Dialog.Panel
                                className={joinClassNames(
                                    'w-full max-w-md transform rounded-2xl text-left align-middle shadow-xl transition-all',
                                    backgroundColors.filter(
                                        (c) => c.name === noteItem.bgColor
                                    )[0].className
                                )}
                            >
                                <form
                                    className={`sticky_note-container group`}
                                    onSubmit={handleSubmit}
                                >
                                    <div className='flexBetween gap-4'>
                                        <div className='flexStart w-full'>
                                            <input
                                                type='text'
                                                placeholder='Title'
                                                className='form_field-input peer font-semibold text-lg'
                                                value={noteItem.title}
                                                onChange={(e) =>
                                                    handleStateChange(
                                                        'title',
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className='flexEnd'>
                                            <button
                                                type='button'
                                                className='sticky_note-action-btn'
                                                onClick={handlePinBtnClick}
                                            >
                                                {noteItem.isPinned ? (
                                                    <RiPushpin2Fill size={20} />
                                                ) : (
                                                    <RiPushpin2Line size={20} />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <textarea
                                        placeholder='Take a note...'
                                        className='form_field-input peer resize-none'
                                        value={noteItem.content}
                                        onChange={(e) =>
                                            handleStateChange(
                                                'content',
                                                e.target.value
                                            )
                                        }
                                        rows={8}
                                    />
                                    <div className='flex flex-wrap gap-2'>
                                        <NoteLabels
                                            labels={noteItem.labels || []}
                                        />
                                    </div>
                                    <div className='flexBetween'>
                                        <div className='flexStart gap-2'>
                                            {noteItem._id && (
                                                <button
                                                    type='button'
                                                    className='sticky_note-action-btn'
                                                    aria-label='Delete'
                                                    onClick={handleDelete}
                                                >
                                                    <RiDeleteBinLine
                                                        size={15}
                                                    />
                                                </button>
                                            )}
                                            {noteItem._id && (
                                                <button
                                                    type='button'
                                                    className='sticky_note-action-btn'
                                                    aria-label='Archive'
                                                    onClick={
                                                        handleArchiveBtnClick
                                                    }
                                                >
                                                    {noteItem.isArchived ? (
                                                        <RiInboxUnarchiveLine
                                                            size={15}
                                                        />
                                                    ) : (
                                                        <RiInboxArchiveLine
                                                            size={15}
                                                        />
                                                    )}
                                                </button>
                                            )}
                                            <BackgroundColorPicker
                                                selectedColor={noteItem.bgColor}
                                                onBackgroundColorChanged={
                                                    handleBackgroundColorChanged
                                                }
                                            />
                                            <LabelPicker
                                                onLabelsSelected={
                                                    handleLabelsSelected
                                                }
                                                selectedLabels={
                                                    noteItem.labels || []
                                                }
                                            />
                                        </div>

                                        <div className='flexEnd gap-2'>
                                            <button
                                                type='submit'
                                                className='uppercase font-semibold text-xs px-4 py-2 hover:bg-slate-500/5 rounded-md'
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default NoteFormModal
