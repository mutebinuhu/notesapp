const mongoose = require('mongoose');
if(process.argv.length < 3)
{
    console.log('give password as argument')
    process.exit(1)

}
const password = process.argv[2]; //Yvp9qeRasgDzn9o6

const url = `mongodb+srv://motesapp:${password}@cluster0.g4p9ej0.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false);
mongoose.connect(url);

const notesSechema = new mongoose.Schema({
    content:String,
    important:Boolean
})

const Note = new mongoose.model('Note',notesSechema);
/*
 const note = new Note({
    content:'This is a third  note',
    important:true
})
note.save().then((result)=>{
    console.log("note saved successfully")
    mongoose.connection.close();
})*/
Note.find({}).then(result=>{
    console.log(result)
    mongoose.connection.close();
})