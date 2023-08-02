import Navbar from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Sticky Wall',
    description: '',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang='en'>
            <body>
                <main>
                    <Navbar />
                    {children}
                </main>
            </body>
        </html>
    )
}
