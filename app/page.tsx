import NoteGridContainer from '@/components/NoteGridContainer'
import SignIn from '@/components/SignIn'
import { getCurrentUser } from '@/libs/session'

const Home = async () => {
    const session = await getCurrentUser()

    if (!session) {
        return <SignIn />
    }

    return (
        <div>
            <h1 className='page_title pb-2'>Sticky Wall</h1>
            <NoteGridContainer session={session} />
        </div>
    )
}

export default Home
