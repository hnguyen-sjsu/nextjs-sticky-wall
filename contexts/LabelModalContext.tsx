'use client'
import { ILabel, ILabelModalContext } from '@/common.types'
import { getLabels } from '@/libs/actions'
import { ReactNode, createContext, useEffect, useState } from 'react'

export const LabelModalContext = createContext<ILabelModalContext>({
    show: false,
    labels: [],
    onLabelsUpdated: (updatedLabels) => {},
})

const LabelModalProvider = ({ children }: { children: ReactNode }) => {
    const [show, setShow] = useState(false)
    const [labels, setLabels] = useState<Array<ILabel>>([])

    const toggleShow = () => {
        setShow(!show)
    }

    useEffect(() => {
        const fetchLabels = async () => {
            const data = await getLabels()
            setLabels(data)
        }

        fetchLabels()
    }, [])

    const onLabelsUpdated = (updatedLabels: Array<ILabel>) => {
        setLabels(updatedLabels)
    }

    return (
        <LabelModalContext.Provider
            value={{ labels, show, toggleShow, onLabelsUpdated }}
        >
            {children}
        </LabelModalContext.Provider>
    )
}

export default LabelModalProvider
