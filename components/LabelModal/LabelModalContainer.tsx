import LabelModal from './LabelModal'
import { getCurrentUser } from '@/libs/session'

const LabelModalContainer = async () => {
    const session = await getCurrentUser()

    return <div>{session && <LabelModal session={session} />}</div>
}

export default LabelModalContainer
