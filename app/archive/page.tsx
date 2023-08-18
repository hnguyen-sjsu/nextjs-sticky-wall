import ArchivedNoteGridContainer from '@/components/ArchivedNoteGridContainer'
import SignIn from '@/components/SignIn'
import { getCurrentUser } from '@/libs/session'

const ArchivePage = async () => {
    const session = await getCurrentUser()

    if (!session) {
        return <SignIn />
    }

    return (
        <div>
            <h1 className='page_title pb-2'>Archived Notes</h1>
            <ArchivedNoteGridContainer session={session} />
        </div>
    )
}

export default ArchivePage
