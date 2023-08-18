import { getCurrentUser } from '@/libs/session'
import Label from '@/models/label'
import Note from '@/models/note'
import { connectToDB } from '@/utils/database'

export const GET = async (
    request: Request,
    { params }: { params: { id: string } }
) => {
    const session = await getCurrentUser()

    if (!session?.user) {
        return new Response('Unauthorized', { status: 401 })
    }
    const labelId = params.id

    if (!labelId) {
        return new Response('No label id provided', { status: 404 })
    }

    try {
        await connectToDB()

        const notes = await Note.find({ labels: { _id: labelId } })
            .populate('creator')
            .populate('labels')
        console.log(notes)

        return new Response(JSON.stringify(notes), { status: 200 })
    } catch (error) {
        return new Response('Failed to fetch notes', { status: 500 })
    }
}
