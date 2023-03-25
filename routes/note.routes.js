const express = require("express")
const noteRouter = express.Router()
const { NoteModel } = require("../model/note.model")
const jwt = require("jsonwebtoken")

noteRouter.get("/", async (req, res) => {
    try {
        const notes = await NoteModel.find()
        res.status(200).send(notes)
    } catch (err) {
        res.status(400).send({ "msg": err.message })
    }
})

noteRouter.post("/add", async (req, res) => {
    try {
        const note = new NoteModel(req.body)
        await note.save()
        res.status(200).send({ "msg": "A New Note has been added" })
    } catch (err) {
        res.status(400).send({ "msg": err.message })
    }
})

noteRouter.patch("/update/:noteID", async (req, res) => {
    const payload = req.body
    const noteID = req.params.noteID
    try {
        await NoteModel.findByIdAndUpdate({ _id: noteID }, payload)
        res.status(200).send({ "msg": "A New Note has been updated" })
    } catch (error) {
        res.status(400).send({ "msg": err.message })
    }
})

noteRouter.delete("/delete/:noteID", async (req, res) => {
    const noteID = req.params.noteID
    try {
        await NoteModel.findByIdAndDelete({ _id: noteID })
        res.status(200).send({ "msg": "A New Note has been deleted" })
    } catch (error) {
        res.status(400).send({ "msg": err.message })
    }
})


module.exports = {
    noteRouter
}