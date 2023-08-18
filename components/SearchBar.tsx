'use client'
import React, { useState } from 'react'
import TextField from './TextField'

const SearchBar = () => {
    const [searchValue, setSearchValue] = useState('')
    return (
        <div>
            <TextField
                leftIconUrl='/search-2-line.svg'
                placeholder='Search...'
                value={searchValue}
                setValue={setSearchValue}
                iconSize={20}
            />
        </div>
    )
}

export default SearchBar
