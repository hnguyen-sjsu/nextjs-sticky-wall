import Image from 'next/image'
import React from 'react'
import { RiAddFill } from 'react-icons/ri'

type Props = {
    title?: string
    placeholder?: string
    value: string
    setValue: (value: string) => void
    rightIconUrl?: string
    leftIconUrl?: string
    iconSize?: number
}

const TextField = ({
    title = '',
    placeholder = '',
    value,
    setValue,
    rightIconUrl = '',
    leftIconUrl = '',
    iconSize = 12,
}: Props) => {
    return (
        <>
            <form className=''>
                <label>{title}</label>
                <div className='flexBetween text_field_container'>
                    {leftIconUrl && (
                        <div className='flexStart'>
                            <Image
                                src={leftIconUrl}
                                width={iconSize}
                                height={iconSize}
                                alt='Text field icon'
                            />
                        </div>
                    )}
                    <input
                        type='text'
                        placeholder={placeholder}
                        value={value}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setValue(e.target.value)
                        }
                        className='w-full px-4 outline-0'
                    />
                </div>
            </form>
        </>
    )
}

export default TextField
