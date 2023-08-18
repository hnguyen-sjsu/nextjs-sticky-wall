'use client'
import { NoteInterface, SessionInterface } from '@/common.types'
import { getUserNotes } from '@/libs/actions'
import { useState, useEffect } from 'react'
import NoteGrid from './NoteGrid'

const ArchivedNoteGridContainer = ({
    session,
}: {
    session: SessionInterface
}) => {
    const [notes, setNotes] = useState<Array<NoteInterface>>([])

    useEffect(() => {
        const fetchNotes = async () => {
            const data = await getUserNotes(true)
            setNotes(data)
        }
        fetchNotes()
    }, [])

    const updateNoteData = (noteItems: Array<NoteInterface>) => {
        setNotes(noteItems.filter((i) => i.isArchived === true))
    }

    return (
        <div>
            <NoteGrid
                notes={notes}
                onNotesUpdated={updateNoteData}
                session={session}
            />
        </div>
    )
}

export default ArchivedNoteGridContainer
