import LabelNoteGridContainer from '@/components/LabelNoteGridContainer'
import SignIn from '@/components/SignIn'
import { getCurrentUser } from '@/libs/session'
import React from 'react'

const LabelPage = async ({ params }: { params: { id: string } }) => {
    const labelId = params.id

    const session = await getCurrentUser()

    if (!session) {
        return <SignIn />
    }

    return (
        <div>
            <LabelNoteGridContainer session={session} labelId={labelId} />
        </div>
    )
}

export default LabelPage
