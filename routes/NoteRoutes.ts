import express from 'express'
import { NoteModel } from '../models'

const noteRoutes = express.Router()

//TODO - Create a new Note
//http://mongoosejs.com/docs/api.html#document_Document-save
noteRoutes.post('/notes', async (req, res) => {
	// Validate request
	if (!req.body) {
		return res.status(400).send({ message: 'Note content can not be empty' })
	}
	//TODO - Write your code here to save the note
	await new NoteModel(req.body)
		.save()
		.then(() => res.sendStatus(201))
		.catch((err) => {
			console.log(err)
			res.status(500).json({ message: 'Error saving note to DB' })
		})
})

//TODO - Retrieve all Notes
//http://mongoosejs.com/docs/api.html#find_find
noteRoutes.get('/notes', async (_, res) => {
	await NoteModel.find()
		.then((notes) => res.status(200).json(notes))
		.catch((err) => {
			console.log(err)
			res.status(500).json({ message: 'Error fetching notes' })
		})
})

//TODO - Retrieve a single Note with noteId
//http://mongoosejs.com/docs/api.html#findbyid_findById
noteRoutes.get('/notes/:noteId', async (req, res) => {
	await NoteModel.findById(req.params.noteId)
		.then((note) => res.status(200).json(note))
		.catch((err) => {
			console.log(err)
			res.status(500).json({
				message: `Error fetching note with id: '${req.params.noteId}'`,
			})
		})
})

//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
noteRoutes.put('/notes/:noteId', async (req, res) => {
	// Validate request
	if (!req.body) {
		return res.status(400).send({
			message: 'Note content can not be empty',
		})
	}
	await NoteModel.findByIdAndUpdate(req.params.noteId, req.body)
		.then(() => res.sendStatus(204))
		.catch((err) => {
			console.log(err)
			res.status(500).json({
				message: `Unable to update record with id: '${req.params.noteId}`,
			})
		})
})

//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
noteRoutes.delete('/notes/:noteId', async (req, res) => {
	await NoteModel.findByIdAndDelete(req.params.noteId)
		.then(() => res.sendStatus(204))
		.catch((err) => {
			console.log(err)
			res.status(500).json({
				message: `Unable to delete record with id: ${req.params.noteId}`,
			})
		})
})

export default noteRoutes
