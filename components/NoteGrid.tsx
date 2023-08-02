import React from 'react'

const NoteGrid = () => {
    return (
        <div className='grid grid-cols-5'>
            {Array.from(Array(10).keys()).map((i) => (
                <h1 key={i}>{i}</h1>
            ))}
        </div>
    )
}

export default NoteGrid
