//const path = require('path')
//require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const mongoose = require("mongoose");
const url = process.env.MONGO_URI
mongoose.set('strictQuery', false)
console.log("connection to url", url);
mongoose.connect(url).then(result=>{
    console.log("connected to DB")
}).catch((error)=>{
    console.log("error connecting to DB", error.message)
})
const noteSchema = new mongoose.Schema({
    content: {
      type: String,
      required: true,
      minlength:5
    },
    important: Boolean,
  })
  
  noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  module.exports = mongoose.model('Note', noteSchema);