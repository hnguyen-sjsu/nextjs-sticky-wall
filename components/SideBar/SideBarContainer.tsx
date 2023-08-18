import { getCurrentUser } from '@/libs/session'
import SideBar from './SideBar'
import MobileSideBar from './MobileSideBarContainer'
import DesktopSideBarContainer from './DesktopSideBarContainer'

const SideBarContainer = async () => {
    const session = await getCurrentUser()
    if (session)
        return (
            <div className='h-full'>
                <DesktopSideBarContainer session={session} />
                <MobileSideBar session={session} />
            </div>
        )
}

export default SideBarContainer
