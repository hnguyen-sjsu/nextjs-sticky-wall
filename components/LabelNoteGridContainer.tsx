'use client'
import { ILabel, NoteInterface, SessionInterface } from '@/common.types'
import { getLabelById, getNotesByLabelId, getUserNotes } from '@/libs/actions'
import { useState, useEffect } from 'react'
import NoteGrid from './NoteGrid'

const LabelNoteGridContainer = ({
    session,
    labelId,
}: {
    session: SessionInterface
    labelId: string
}) => {
    const [notes, setNotes] = useState<Array<NoteInterface>>([])
    const [label, setLabel] = useState<ILabel | null>(null)
    useEffect(() => {
        const fetchNotes = async () => {
            const data = await getNotesByLabelId(labelId)
            setNotes(data)
        }
        fetchNotes()

        const fetchLabel = async () => {
            const data = await getLabelById(labelId)
            setLabel(data)
        }

        fetchLabel()
    }, [])

    const updateNoteData = (noteItems: Array<NoteInterface>) => {
        setNotes(
            noteItems.filter((noteItem) =>
                noteItem.labels?.some((label) => label._id === labelId)
            )
        )
    }

    return (
        <div>
            {label && <h1 className='page_title pb-2'>{label.title}</h1>}
            <NoteGrid
                notes={notes}
                onNotesUpdated={updateNoteData}
                session={session}
            />
        </div>
    )
}

export default LabelNoteGridContainer
