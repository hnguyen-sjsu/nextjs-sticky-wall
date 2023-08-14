import { Schema, model, models } from 'mongoose'

const LabelSchema = new Schema({
    title: { type: String },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
})

const Label = models.Label || model('Label', LabelSchema)

export default Label
