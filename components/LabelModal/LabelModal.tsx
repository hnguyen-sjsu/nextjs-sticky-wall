'use client'
import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import LabelForm from './LabelForm'
import { ILabel, SessionInterface } from '@/common.types'
import { getLabels } from '@/libs/actions'
import { LabelModalContext } from '@/contexts/LabelModalContext'

type Props = {
    session: SessionInterface
}

const LabelModal = ({ session }: Props) => {
    // const [labels, setLabels] = useState<Array<ILabel>>([])
    const { labels, onLabelsUpdated } = useContext(LabelModalContext)
    const { show, toggleShow } = useContext(LabelModalContext)

    const closeModal = () => {
        toggleShow!()
    }

    const handleLabelAdded = (label: ILabel) => {
        const updatedLabels = [...labels, label]
        // setLabels(updatedLabels)
        onLabelsUpdated(updatedLabels)
    }

    const handleLabelUpdated = (label: ILabel) => {
        const updatedLabels = labels.map((i) =>
            i._id === label._id ? label : i
        )
        // setLabels(updatedLabels)
        onLabelsUpdated(updatedLabels)
    }

    const handleLabelDeleted = (label: ILabel) => {
        const filteredLabels = labels.filter((i) => i._id !== label._id)
        // setLabels(updatedLabels)
        onLabelsUpdated(filteredLabels)
    }

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const result = await getLabels()
    //         setLabels(result)
    //     }

    //     if (session) fetchData()
    // }, [])

    return (
        <Transition appear show={show} as={Fragment}>
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
                            <Dialog.Panel className='w-full max-w-md transform rounded-2xl text-left align-middle shadow-xl transition-all bg-white overflow-hidden'>
                                <div className='p-4'>
                                    <h1 className='font-semibold text-xl pb-2'>
                                        Edit Labels
                                    </h1>

                                    <LabelForm
                                        session={session}
                                        onLabelAdded={handleLabelAdded}
                                        onLabelUpdated={handleLabelUpdated}
                                        onLabelDeleted={handleLabelDeleted}
                                    />
                                    <div className='h-80 overflow-y-scroll transition-width ease-in-out duration-500'>
                                        {labels.map((label) => (
                                            <div key={label._id}>
                                                <LabelForm
                                                    label={label}
                                                    session={session}
                                                    onLabelAdded={
                                                        handleLabelAdded
                                                    }
                                                    onLabelUpdated={
                                                        handleLabelUpdated
                                                    }
                                                    onLabelDeleted={
                                                        handleLabelDeleted
                                                    }
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className='flexEnd mt-4'>
                                        <button
                                            type='button'
                                            className='rounded-full px-4 py-2 font-semibold text-xs uppercase hover:bg-black/10'
                                            onClick={toggleShow}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default LabelModal
