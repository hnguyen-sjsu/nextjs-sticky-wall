import Label from '@/models/label'
import { connectToDB } from '@/utils/database'

export const POST = async (req: any) => {
    const { userId, title } = await req.json()
    console.log('Kenny', userId, title)
    try {
        await connectToDB()
        const newLabel = new Label({
            creator: userId,
            title: title,
        })

        await newLabel.save()

        return new Response(JSON.stringify(newLabel), { status: 201 })
    } catch (error) {
        console.log(error)
        return new Response('Failed to create new label', { status: 500 })
    }
}
