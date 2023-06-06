const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config()
const Note = require("./models/note")
const app = express();
app.use(cors())
app.use(express.static("build"));
app.use(express.json())
let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]
 

app.get("/api/notes",(req, res)=>{
  notes = Note.find({}).then((notes)=>{
    res.json(notes)
  })
} )



app.post("/api/notes", (req, res, next)=>{
  //const note = req.body
  const generateId = () =>  notes.length > 0 ? Math.max(...notes.map(note=>note.id)) : 0
  const body = req.body
  if(!body.content){
    return res.status(400).json({
      "error":"Content missing"
    })
  }
  const note = new Note({
    content: body.content,
    important: body.important || false,
  })
  note.save().then(savedNote=>{
    res.json(savedNote)
  }).catch(error=>next(error))
})


//get single resource
app.get("/api/notes/:id", (req, res, next)=>{
 
  Note.findById(req.params.id).then(note=>{
    if(note){
      res.json(note)
    }else{
      res.status(404).end()
    }
  }).catch(error=>{
    next(error)
  })

})
app.put("/api/notes/:id", (req, res, next)=>{
  let note = {
    content: req.body.content,
    important: req.body.important
  }
  Note.findByIdAndUpdate(req.params.id, note, {new:true, runValidators: true, context: 'query'}).then(note=>{
    res.json(note)
  }).catch(err=>next(err))
})
app.delete("/api/notes/:id", (req, res, next)=>{
 Note.findByIdAndRemove(req.params.id).then(result=>{
  res.status(204).end()
 }).catch(err=>next(err))

})

const errorHandler = (error, req, res, next) =>{
 
  if(error.name == "CastError")
  {
    return res.status(400).send({"error":"Malfunctioned id"})
  }else if(error.name == "ValidationError"){
    return res.status(400).json({"error":error.message})
  }
  next(error)
}
app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`app is running on port ${PORT}`)
})