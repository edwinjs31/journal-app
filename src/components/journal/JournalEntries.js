import React from "react";
import { JournalEntry } from "./JournalEntry";
import { useSelector } from "react-redux";
import "../../styles/journal.css";

export const JournalEntries = () => {
  //obtenemos el array de notas desde el state del store
  const {notes} = useSelector((state)=>state.notes)

  return (
    <div className="journal-entries">
      {notes.map((note) => (
        <JournalEntry key={note.id} {...note}/>
      ))}
    </div>
  );
};
