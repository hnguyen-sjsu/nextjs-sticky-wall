import { NoteInterface } from '@/common.types'
import { getCurrentUser } from '@/libs/session'
import { connectToDB } from '@/utils/database'
import Note from '@/models/note'

export const GET = async () => {
    const session = await getCurrentUser()

    if (!session?.user) {
        return new Response('Unauthorized', { status: 401 })
    }

    try {
        await connectToDB()

        const notes: Array<NoteInterface> = await Note.find({
            creator: { _id: session?.user?.id },
            isArchived: false,
        }).populate(['creator', 'labels'])

        return new Response(JSON.stringify(notes), { status: 200 })
    } catch (error) {
        return new Response('Failed to fetch all notes', { status: 500 })
    }
}
