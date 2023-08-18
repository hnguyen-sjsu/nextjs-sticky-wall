import Note from '@/models/note'
import { connectToDB } from '@/utils/database'

export const POST = async (req: any) => {
    const { userId, form } = await req.json()
    try {
        await connectToDB()
        const newNote = new Note({
            creator: userId,
            title: form.title || '',
            content: form.content || '',
            isPinned: form.isPinned || false,
            isArchived: form.isArchived || false,
            bgColor: form.bgColor || 'yellow',
            labels: form.labels || [],
        })

        const result = await newNote.save()
        console.log(result)
        return new Response(JSON.stringify(newNote), { status: 201 })
    } catch (error) {
        console.log(error)
        return new Response('Failed to create new note', { status: 500 })
    }
}
