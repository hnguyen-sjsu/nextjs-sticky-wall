import { ILabel } from '@/common.types'
import React from 'react'

const NoteLabels = ({ labels }: { labels: Array<ILabel> }) => {
    return (
        <div className='flex flex-wrap gap-2'>
            {labels.map((i) => (
                <div
                    key={i._id}
                    className='flex rounded-full bg-black/5 text-xs font-medium items-center py-1 px-2 gap-2 text-black/75 hover:text-black cursor-pointer'
                >
                    <span>{i.title}</span>
                </div>
            ))}
        </div>
    )
}

export default NoteLabels
