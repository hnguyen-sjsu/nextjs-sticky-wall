import { NoteInterface } from '@/common.types'
import { getCurrentUser } from '@/libs/session'
import Note from '@/models/note'
import { connectToDB } from '@/utils/database'
import { ObjectId } from 'mongodb'
import { NextRequest } from 'next/server'

export const GET = async (request: NextRequest) => {
    const session = await getCurrentUser()

    if (!session?.user) {
        return new Response(JSON.stringify({ message: 'Unauthorized' }), {
            status: 401,
        })
    }

    const size = Number(request.nextUrl.searchParams.get('size'))
    const isArchived =
        request.nextUrl.searchParams.get('isArchived')?.toLowerCase() === 'true'
    const lastId = request.nextUrl.searchParams.get('lastId')

    try {
        await connectToDB()

        let notes: Array<NoteInterface> = []
        if (!size && !isArchived) {
            return new Response(JSON.stringify({ message: 'Missing params' }), {
                status: 500,
            })
        }

        const total = await Note.find({
            creator: { _id: session?.user?.id },
            isArchived: isArchived,
        }).estimatedDocumentCount()

        if (!lastId) {
            // First page
            notes = await Note.find(
                {
                    creator: { _id: session?.user?.id },
                    isArchived: isArchived,
                },
                {}
            )
                .sort({ $natural: -1 })
                .limit(size)
                .populate(['creator', 'labels'])
        } else {
            const obId = new ObjectId(lastId)
            notes = await Note.find({
                creator: { _id: session?.user?.id },
                isArchived: isArchived,
                _id: { $lt: obId },
            })
                .sort({ $natural: -1 })
                .limit(size)
                .populate(['creator', 'labels'])
        }
        return new Response(JSON.stringify({ notes: notes, total: total }), {
            status: 200,
        })
    } catch (error) {
        return new Response(
            JSON.stringify({ message: 'Failed to load notes' }),
            { status: 500 }
        )
    }
}
