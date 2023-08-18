import SideBarProvider from '@/contexts/SideBarContext'
import './globals.css'
import type { Metadata } from 'next'
import SideBarContainer from '@/components/SideBar/SideBarContainer'
import LabelModalContainer from '@/components/LabelModal/LabelModalContainer'
import LabelModalProvider from '@/contexts/LabelModalContext'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
    title: 'Sticky Wall',
    description: '',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang='en'>
            <body>
                <main>
                    <LabelModalProvider>
                        <SideBarProvider>
                            <div className='fixed inset-0 flex h-full'>
                                <div className='max-sm:hidden h-full'>
                                    <SideBarContainer />
                                </div>
                                <div className='w-full h-full p-4 overflow-y-scroll'>
                                    <Navbar />
                                    <div className='max-sm:pt-12'>
                                        {children}
                                        <LabelModalContainer />
                                    </div>
                                </div>
                            </div>
                        </SideBarProvider>
                    </LabelModalProvider>
                </main>
            </body>
        </html>
    )
}

export default RootLayout
