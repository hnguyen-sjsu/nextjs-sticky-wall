'use client'
import { ILabel } from '@/common.types'
import { LabelModalContext } from '@/contexts/LabelModalContext'
import { getLabels } from '@/libs/actions'
import { Popover, Transition } from '@headlessui/react'
import React, {
    Fragment,
    useState,
    useEffect,
    ChangeEvent,
    useContext,
} from 'react'
import { RiBookmarkLine } from 'react-icons/ri'

const LabelItem = ({
    label,
    selected,
    onLabelSelected,
}: {
    label: ILabel
    selected: boolean
    onLabelSelected: (label: ILabel, selected: boolean) => void
}) => {
    const [checked, setChecked] = useState(selected)
    const handleLabelSelected = (e: ChangeEvent<HTMLInputElement>) => {
        setChecked(e.target.checked)
        onLabelSelected(label, e.target.checked)
    }

    return (
        <div className='flexStart gap-2'>
            <input
                id={label._id?.toString()}
                type='checkbox'
                name={label._id?.toString()}
                checked={checked}
                onChange={handleLabelSelected}
            />
            <label htmlFor={label._id?.toString()}>{label.title}</label>
        </div>
    )
}

type Props = {
    selectedLabels: Array<ILabel>
    onLabelsSelected: (labels: Array<ILabel>) => void
}

const LabelPicker = ({ selectedLabels, onLabelsSelected }: Props) => {
    const [labels, setLabels] = useState<
        Array<{ label: ILabel; selected: boolean }>
    >([])

    const labelModalContext = useContext(LabelModalContext)

    const handleLabelSelected = (label: ILabel, selected: boolean) => {
        const updatedLabels = labels.map((i) =>
            i.label._id === label._id
                ? { label: i.label, selected: selected }
                : i
        )
        setLabels(updatedLabels)
        onLabelsSelected(
            updatedLabels.filter((i) => i.selected).map((i) => i.label)
        )
    }

    useEffect(() => {
        const fetchData = async () => {
            setLabels(
                labelModalContext.labels.map((i) => {
                    return {
                        label: i,
                        selected: selectedLabels.some(
                            (label) => label._id === i._id
                        ),
                    }
                })
            )
        }

        fetchData()
    }, [])

    return (
        <>
            <Popover className='relative'>
                <Popover.Button className='sticky_note-action-btn'>
                    <RiBookmarkLine size={15} />
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
                            <div className='relative flex flex-col gap-2 bg-white p-4 min-w-[16rem]'>
                                <h1 className='font-semibold'>Labels</h1>
                                {labels.map(({ label, selected }) => (
                                    <div key={label._id}>
                                        <LabelItem
                                            label={label}
                                            selected={selected}
                                            onLabelSelected={
                                                handleLabelSelected
                                            }
                                        />
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

export default LabelPicker
