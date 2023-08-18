import { backgroundColors } from '@/constants'
import { joinClassNames } from '@/utils'
import { Popover, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import { RiPaletteLine, RiCheckFill } from 'react-icons/ri'

const BackgroundColorPicker = ({
    selectedColor,
    onBackgroundColorChanged,
}: {
    selectedColor?: string
    onBackgroundColorChanged: (newBgColor: string) => void
}) => {
    const [colors, setColors] = useState(
        backgroundColors.map((c) => ({ ...c, selected: false }))
    )

    const updateSelectedColor = (colorName: string) => {
        const updatedColors = colors.map((c) => ({
            ...c,
            selected: c.name === colorName,
        }))
        setColors(updatedColors)
    }

    const handleColorPicked = (colorName: string) => {
        updateSelectedColor(colorName)
        onBackgroundColorChanged(colorName)
    }

    useEffect(() => {
        updateSelectedColor(selectedColor || 'yellow')
    }, [])

    return (
        <>
            <Popover className='relative'>
                <Popover.Button className='sticky_note-action-btn'>
                    <RiPaletteLine size={15} />
                </Popover.Button>
                <Transition
                    as={Fragment}
                    enter='transition ease-out duration-200'
                    enterFrom='opacity-0 translate-y-1'
                    enterTo='opacity-100 translate-y-0'
                    leave='transition ease-in duration-150'
                    leaveFrom='opacity-100 translate-y-0'
                    leaveTo='opacity-0 translate-y-1'
                >
                    <Popover.Panel className='absolute z-50 mt-3 max-w-sm transform px-4 sm:px-0 lg:max-w-3xl'>
                        <div className='overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5'>
                            <div className='relative flex gap-2 bg-white p-2 '>
                                {colors.map((c) => (
                                    <div
                                        key={c.name}
                                        aria-label={c.name}
                                        className={joinClassNames(
                                            'ring-inset',
                                            c.selected
                                                ? 'ring-2 ring-black ring-opacity-10 '
                                                : 'ring-0',
                                            'color_picker_btn',
                                            c.className.toString()
                                        )}
                                        onClick={() =>
                                            handleColorPicked(c.name)
                                        }
                                    >
                                        <div
                                            className={
                                                c.selected
                                                    ? 'opacity-100'
                                                    : 'opacity-0'
                                            }
                                        >
                                            <RiCheckFill size={15} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Popover.Panel>
                </Transition>
            </Popover>
        </>
    )
}

export default BackgroundColorPicker
