const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors())
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
    res.json(notes)
} )



app.post("/api/notes", (req, res)=>{
  //const note = req.body
  const generateId = () =>  notes.length > 0 ? Math.max(...notes.map(note=>note.id)) : 0
  const body = req.body
  if(!body.content){
    return res.status(400).json({
      "error":"Content missing"
    })
  }
  let note = {
    id:generateId() + 1,
    content: body.content,
    important: body.important || false
  }
  notes = notes.concat(note)
  res.json(notes)
})

//get single resource
app.get("/api/notes/:id", (req, res)=>{
  const id = Number(req.params.id)
  const note = notes.find(note=>note.id === id)
  if(note){
    res.json(note)

  }
  res.status(404).end()
})
app.delete("/api/notes/:id", (req, res)=>{
  const id = Number(req.params.id)
 notes = notes.filter(note=>note.id !== id)
 res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
    console.log(`app is running on port ${PORT}`)
})