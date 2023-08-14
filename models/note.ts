import { Schema, model, models } from 'mongoose'

const NoteSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    isPinned: {
        type: Boolean,
    },
    isArchived: {
        type: Boolean,
    },
    bgColor: {
        type: String,
    },
    labels: [{ type: Schema.Types.ObjectId, ref: 'Label' }],
})

const Note = models.Note || model('Note', NoteSchema)

export default Note
