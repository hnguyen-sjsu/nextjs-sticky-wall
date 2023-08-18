import { getCurrentUser } from '@/libs/session'
import Note from '@/models/note'
import { connectToDB } from '@/utils/database'

interface RouteParams {
    params: {
        id: string
    }
}

export const GET = async (request: Request, { params }: RouteParams) => {
    try {
        await connectToDB()

        const note = await Note.findById(params.id).populate('creator')

        if (!note)
            return new Response('Note details not found', { status: 400 })

        const session = await getCurrentUser()

        if (session && note.creator._id.toString() !== session.user.id) {
            return new Response('Unauthorized', { status: 401 })
        }

        return new Response(JSON.stringify(note), { status: 200 })
    } catch (error) {
        return new Response('Failed to get note details', { status: 500 })
    }
}

export const PATCH = async (request: Request, { params }: RouteParams) => {
    const { note } = await request.json()
    try {
        await connectToDB()

        let existingNote = await Note.findById(params.id)

        if (!existingNote)
            return new Response('Note details not found', { status: 400 })

        const session = await getCurrentUser()

        if (
            session &&
            existingNote.creator._id.toString() !== session.user.id
        ) {
            return new Response('Unauthorized', { status: 401 })
        }

        const updatedNote = await Note.findByIdAndUpdate(params.id, note, {
            new: true,
        })
            .populate('labels')
            .exec()
        console.log(updatedNote)
        return new Response(JSON.stringify(updatedNote), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response('Failed to update note', { status: 500 })
    }
}

export const DELETE = async (request: Request, { params }: RouteParams) => {
    try {
        await connectToDB()
        let existingNote = await Note.findById(params.id)

        if (!existingNote)
            return new Response('Note details not found', { status: 400 })

        const session = await getCurrentUser()

        if (
            session &&
            existingNote.creator._id.toString() !== session.user.id
        ) {
            return new Response('Unauthorized', { status: 401 })
        }

        const result = await Note.findByIdAndDelete(params.id).exec()

        if (!result) {
            return new Response('Failed to delete note', { status: 404 })
        }

        return new Response('Delete successful', { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response('Failed to delete note', { status: 500 })
    }
}
