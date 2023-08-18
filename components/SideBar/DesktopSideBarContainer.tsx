import { joinClassNames } from '@/utils'
import React from 'react'
import SideBar from './SideBar'
import { SessionInterface } from '@/common.types'

const DesktopSideBarContainer = ({
    session,
}: {
    session: SessionInterface
}) => {
    return (
        <div className='py-4 h-full'>
            <div className={joinClassNames('sidebar_container')}>
                <SideBar session={session} />
            </div>
        </div>
    )
}

export default DesktopSideBarContainer
