import express from 'express'
import { createNote, deleteNote, listNote, listNotes } from './noteController.js'
import { multer,storage } from "../middlewares/multerMiddlerware.js"

const noteRoute = express.Router()
const upload = multer({storage: storage})

noteRoute.get('/', listNotes)
noteRoute.post('/', upload.single('file'), createNote)
noteRoute.get('/:id', listNote)
noteRoute.delete('/:id', deleteNote)

export default noteRoute