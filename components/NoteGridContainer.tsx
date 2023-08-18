'use client'
import { NoteInterface, SessionInterface } from '@/common.types'
import { getUserNotes, loadUserNotes } from '@/libs/actions'
import { useState, useEffect } from 'react'
import NoteGrid from './NoteGrid'

const pageSize = 10

const NoteGridContainer = ({ session }: { session: SessionInterface }) => {
    const [notes, setNotes] = useState<Array<NoteInterface>>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [total, setTotal] = useState<number>(0)

    useEffect(() => {
        const fetchNotes = async () => {
            setIsLoading(true)
            // const data = await getUserNotes(false)
            await loadUserNotes(pageSize).then((data) => {
                setNotes(data.notes)
                setTotal(data.total)
                setIsLoading(false)
            })
        }
        fetchNotes()
    }, [])

    const updateNoteData = (noteItems: Array<NoteInterface>) => {
        setNotes(noteItems.filter((i) => i.isArchived === false))
    }

    const handleLoadMore = async () => {
        setIsLoading(true)
        const lastId = notes[notes.length - 1]._id?.toString()
        loadUserNotes(pageSize, lastId).then((data) => {
            setNotes([...notes, ...data.notes])
            setIsLoading(false)
        })
    }

    return (
        <div>
            <NoteGrid
                notes={notes}
                onNotesUpdated={updateNoteData}
                session={session}
                showAddButton={true}
                onLoadMoreClick={handleLoadMore}
                total={total}
            />
        </div>
    )
}

export default NoteGridContainer
