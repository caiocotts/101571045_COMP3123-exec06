import { model, Schema } from 'mongoose'

//TODO - Create Note Schema here having fields
//      - noteTitle
//      - noteDescription
//      - priority (Value can be HIGH, LOW or MEDUIM)
//      - dateAdded
//      - dateUpdated

const NoteModel = model(
	'NoteModel',
	new Schema(
		{
			noteTitle: { type: String, required: true },
			noteDescription: String,
			priority: { type: String, enum: ['HIGH', 'MEDIUM', 'LOW'] },
		},
		{ timestamps: true },
	),
)

export default NoteModel
