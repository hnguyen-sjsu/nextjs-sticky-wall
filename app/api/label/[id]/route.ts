import { getCurrentUser } from '@/libs/session'
import { connectToDB } from '@/utils/database'
import Label from '@/models/label'

interface RouteParams {
    params: {
        id: string
    }
}

export const GET = async (request: Request, { params }: RouteParams) => {
    try {
        let existingLabel = await Label.findById(params.id)

        if (!existingLabel)
            return new Response('Label not found', { status: 400 })

        const session = await getCurrentUser()
        if (
            session &&
            existingLabel.creator._id.toString() !== session.user.id
        ) {
            return new Response('Unauthorized', { status: 401 })
        }

        return new Response(JSON.stringify(existingLabel), { status: 200 })
    } catch (error) {
        return new Response(
            JSON.stringify({ message: 'Failed to get label' }),
            { status: 500 }
        )
    }
}

export const PATCH = async (request: Request, { params }: RouteParams) => {
    const { label } = await request.json()

    try {
        let existingLabel = await Label.findById(params.id)

        if (!existingLabel)
            return new Response('Label not found', { status: 400 })

        const session = await getCurrentUser()
        if (
            session &&
            existingLabel.creator._id.toString() !== session.user.id
        ) {
            return new Response('Unauthorized', { status: 401 })
        }

        const updatedLabel = await Label.findByIdAndUpdate(params.id, label, {
            new: true,
        }).exec()

        return new Response(JSON.stringify(updatedLabel), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response('Failed to update label', { status: 500 })
    }
}

export const DELETE = async (request: Request, { params }: RouteParams) => {
    try {
        await connectToDB()

        let existingLabel = await Label.findById(params.id)

        if (!existingLabel)
            return new Response('Label not found', { status: 400 })

        const session = await getCurrentUser()

        if (
            session &&
            existingLabel.creator._id.toString() !== session.user.id
        ) {
            return new Response('Unauthorized', { status: 401 })
        }

        const result = await Label.findByIdAndDelete(params.id).exec()

        if (!result) {
            return new Response('Failed to delete label', { status: 404 })
        }

        return new Response('Label deleted successfully', { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response('Failed to delete label', { status: 500 })
    }
}
