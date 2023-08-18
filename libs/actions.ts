import { NoteInterface, ILabel } from '@/common.types'

const isProduction = process.env.NODE_ENV === 'production'

const serverUrl = isProduction
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : 'http://localhost:3000'

export const fetchToken = async () => {
    try {
        const response = await fetch(`${serverUrl}/api/auth/token`)
        return response.json()
    } catch (error) {
        throw error
    }
}

export const createNewNote = async (userId: string, form: NoteInterface) => {
    const response = await fetch('/api/note/new', {
        method: 'POST',
        body: JSON.stringify({
            form: form,
            userId: userId,
        }),
    })
    if (response.ok) return response.json()

    return null
}

export const updateNoteItem = async (noteItem: NoteInterface, id: string) => {
    const response = await fetch(`/api/note/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ note: { ...noteItem } }),
    })

    if (response.ok) {
        return response.json()
    }

    return null
}

export const deleteNote = async (id: string) => {
    return await fetch(`/api/note/${id}`, { method: 'DELETE' })
}

export const getUserNotes = async (isArchived?: boolean) => {
    let result: Array<NoteInterface> = []

    const route = isArchived ? '/api/note/archive' : '/api/note'

    result = await fetch(route)
        .then((res) => res.json())
        .then((res) => res.map((i: any) => i as NoteInterface))

    return result
}

export const loadUserNotes = async (pageSize: number, lastId?: string) => {
    let route = `/api/note/get?size=${pageSize}&isArchived=false`

    if (lastId) {
        route += '&lastId=' + lastId
    }

    console.log(route)

    const result = await fetch(route).then((res) => res.json())

    return {
        notes: result.notes.map((i: any) => i as NoteInterface),
        total: result.total,
    }
}

export const createLabel = async (userId: string, title: string) => {
    const response = await fetch('/api/label/new', {
        method: 'POST',
        body: JSON.stringify({
            userId: userId,
            title: title,
        }),
    })

    if (response.ok) return response.json()

    return null
}

export const updateLabel = async (label: ILabel) => {
    const response = await fetch(`/api/label/${label._id}`, {
        method: 'PATCH',
        body: JSON.stringify({ label: { ...label } }),
    })

    if (response.ok) {
        return response.json()
    }

    return null
}

export const deleteLabel = async (label: ILabel) => {
    const response = await fetch(`/api/label/${label._id}`, {
        method: 'DELETE',
    })

    if (response.ok) {
        return true
    }

    return false
}

export const getLabelById = async (labelId: string) => {
    const result = await fetch(`/api/label/${labelId}`, {
        method: 'GET',
    }).then((res) => res.json())
    return result
}

export const getLabels = async () => {
    let result: Array<ILabel> = []
    result = await fetch('/api/label')
        .then((res) => res.json())
        .then((res) => res.map((i: any) => i as ILabel))

    return result
}

export const getNotesByLabelId = async (labelId: string) => {
    let result: Array<NoteInterface> = []
    result = await fetch(`/api/note/label/${labelId}`)
        .then((res) => res.json())
        .then((res) => res.map((i: any) => i as NoteInterface))
    return result
}
