import NoteContext from './noteContext'
import React, { useState } from 'react'

const NoteState = (props) =>{
  const host = "http://localhost:5000"

  // const [notes, setNotes] = useState(notesInitial)
const notesInitial = []
const [notes, setNotes] = useState(notesInitial)

  // Get all notes 

  const getNotes =async ()=>{
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      }
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)
  }

  // Add a note
  const addNote = async (title, description, tag)=>{
    console.log("Adding a new note");
    // TODO : API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      },
     body: JSON.stringify({title, description, tag})
    });
    const note = await response.json(); 
    setNotes(notes.concat(note))
  }

  // Delete a note
const deleteNote =async (id)=>{
  console.log("Deleting the note with id " + id);
  const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
    method: 'DELETE', 
    headers: {
      'Content-Type': 'application/json',
      'auth-token':localStorage.getItem('token')
    },
  //  body: JSON.stringify({ title ,description, tag})
  });
  const json = await response.json();
  console.log(json)
  const newNotes = notes.filter((note)=> {return note._id!==id})
  setNotes(newNotes)
}

  // Edit a note
  const editNote = async (id, title, description ,tag)=>{
    // PUT Method to call the editnote api
    // const url = ""
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      },
     body: JSON.stringify({ title ,description, tag})
    });
    const json =  response.json(); 
    console.log(json)

    let newNote = JSON.parse(JSON.stringify(notes))
    // Logic for editting the note
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      
      if(element._id===id){
        newNote[index].title = title
        newNote[index].description = description
        newNote[index].tag = tag
        break;
      }
    }
    setNotes(newNote)

  }

  return(
  <NoteContext.Provider value = {{notes, getNotes, editNote, deleteNote, addNote}}>
    {props.children}
  </NoteContext.Provider>
  )
}

export default NoteState;