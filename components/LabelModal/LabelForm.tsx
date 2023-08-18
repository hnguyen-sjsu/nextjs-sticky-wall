'use client'
import { ILabel, SessionInterface } from '@/common.types'
import { createLabel, deleteLabel, updateLabel } from '@/libs/actions'
import { joinClassNames } from '@/utils'
import { useRef, useEffect, useState } from 'react'
import {
    RiAddFill,
    RiBookmarkLine,
    RiCheckFill,
    RiDeleteBinLine,
    RiPencilFill,
} from 'react-icons/ri'

type Props = {
    label?: ILabel
    session: SessionInterface
    onLabelAdded: (label: ILabel) => void
    onLabelUpdated: (label: ILabel) => void
    onLabelDeleted: (label: ILabel) => void
}

const LabelForm = ({
    label,
    session,
    onLabelAdded,
    onLabelUpdated,
    onLabelDeleted,
}: Props) => {
    const [focused, setFocused] = useState(false)
    const [hovered, setHovered] = useState(false)
    const [title, setTitle] = useState('')

    const textField = useRef<HTMLInputElement>(null)
    const container = useRef<HTMLDivElement>(null)

    const handleFocus = () => {
        setFocused(true)
    }

    const handleBlur = () => {
        setFocused(false)
    }

    const handleHover = () => {
        setHovered(true)
    }

    const handleUnhover = () => {
        setHovered(false)
    }

    useEffect(() => {
        if (label) {
            setTitle(label.title)
        }

        const inputElement = textField.current
        const divElement = container.current

        if (inputElement) {
            inputElement.addEventListener('focus', handleFocus)
            inputElement.addEventListener('blur', handleBlur)
        }

        if (divElement) {
            divElement.addEventListener('mouseenter', handleHover)
            divElement.addEventListener('mouseleave', handleUnhover)
        }

        return () => {
            inputElement?.removeEventListener('focus', handleFocus)
            inputElement?.removeEventListener('blur', handleBlur)
            divElement?.removeEventListener('mouseenter', handleHover)
            divElement?.removeEventListener('mouseleave', handleUnhover)
        }
    }, [])

    const handleSaveButtonClick = async () => {
        textField.current?.blur()
        if (title) {
            if (label) {
                // Update Label
                const result = await updateLabel({ ...label, title: title })
                onLabelUpdated(result)
            } else {
                // Create new Label
                const result = await createLabel(session?.user?.id, title)
                onLabelAdded(result)
                setTitle('')
            }
        }
    }

    const handleDeleteButtonClick = async () => {
        if (label) {
            const result = await deleteLabel(label)
            if (result) {
                onLabelDeleted(label)
            }
        }
    }

    return (
        <div
            key={label?._id || ''}
            className={joinClassNames(
                'flexBetween px-2 my-2',
                focused || hovered ? 'bg-slate-100 rounded-full' : ''
            )}
            ref={container}
        >
            <button
                type='button'
                className='rounded-btn'
                onClick={handleDeleteButtonClick}
            >
                {label?._id ? (
                    hovered ? (
                        <RiDeleteBinLine size={15} />
                    ) : (
                        <RiBookmarkLine size={15} />
                    )
                ) : (
                    <RiAddFill size={15} />
                )}
            </button>
            <div className='w-full'>
                <input
                    type='text'
                    value={title}
                    className='w-full p-2 outline-none bg-transparent'
                    ref={textField}
                    placeholder={
                        label?._id ? 'Update label name' : 'Enter label name'
                    }
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSaveButtonClick()
                        }
                    }}
                />
            </div>
            <button
                type='button'
                className='rounded-btn'
                onClick={handleSaveButtonClick}
            >
                {focused ? (
                    <RiCheckFill size={15} />
                ) : (
                    <RiPencilFill size={15} />
                )}
            </button>
        </div>
    )
}

export default LabelForm
