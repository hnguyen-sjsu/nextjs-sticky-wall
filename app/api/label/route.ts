import { ILabel } from '@/common.types'
import { getCurrentUser } from '@/libs/session'
import Label from '@/models/label'
import { connectToDB } from '@/utils/database'

export const GET = async () => {
    const session = await getCurrentUser()

    if (!session?.user) {
        return new Response('Unauthorized', { status: 401 })
    }

    try {
        await connectToDB()

        const labels: Array<ILabel> = await Label.find({
            creator: { _id: session?.user?.id },
        })

        return new Response(JSON.stringify(labels), { status: 200 })
    } catch (error) {
        return new Response('Failed to fetch all labels', { status: 500 })
    }
}
