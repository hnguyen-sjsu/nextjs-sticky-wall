import React from 'react'

const TrashPage = () => {
    return (
        <div className='h-full'>
            <div className='flex flex-col bg-slate-500 h-full min-h-full'>
                <div className='flex flex-col bg-green-400 h-28'>Green</div>
                <div className='flex flex-col flex-grow bg-red-400'>Red</div>
                <div className='flex flex-col bg-blue-400 h-28'>Blue</div>
            </div>
        </div>
    )
}

export default TrashPage
