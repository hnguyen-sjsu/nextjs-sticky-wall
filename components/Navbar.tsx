import { getCurrentUser } from '@/libs/session'

import SideBarToggleButton from './SideBar/SideBarToggleButton'

const Navbar = async () => {
    return (
        <div className='sm:hidden fixed z-50'>
            <SideBarToggleButton />
        </div>
    )
}

export default Navbar
