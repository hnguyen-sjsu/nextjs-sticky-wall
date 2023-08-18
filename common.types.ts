import { User, Session } from 'next-auth'

export interface SessionInterface extends Session {
    user: User & {
        id: string
        name: string
        email: string
        avatarUrl: string
    }
}

export interface NoteInterface {
    _id?: string
    title: string
    content: string
    isArchived: boolean
    isPinned: boolean
    bgColor: string
    createdBy?: {
        name: string
        email: string
        avatarUrl: string
        id: string
    }
    labels?: Array<ILabel>
}

export interface UserProfile {
    id: string
    name: string
    email: string
    description: string | null
    avatarUrl: string
    notes: {
        edges: { node: NoteInterface }[]
        pageInfo: {
            hasPreviousPage: boolean
            hasNextPage: boolean
            startCursor: string
            endCursor: string
        }
    }
}

export interface ISideBarContext {
    show: boolean
    toggleShow?: () => void
}

export interface ILabelModalContext {
    show: boolean
    toggleShow?: () => void
    labels: Array<ILabel>
    onLabelsUpdated: (updatedLabels: Array<ILabel>) => void
}

export interface IAuthContext {
    id: string
    name: string
    email: string
    avatarUrl: string
}

export interface ILabel {
    _id?: string
    title: string
    notes?: Array<NoteInterface>
}
