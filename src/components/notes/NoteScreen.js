import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { activeNote, startDelete } from "../../actions/notes";
import { useForm } from "../../hooks/useForm";
import "../../styles/notes.css";
import { NotesAppBar } from "./NotesAppBar";

export const NoteScreen = () => {
  //obtenemos la nota activa del store y la renombramos
  const { active: note } = useSelector((state) => state.notes);
  const [formValue, handleInputChange, reset] = useForm(note);
  const { title, body, id } = formValue;
  const dispatch = useDispatch();

  //activeId apunte a la id de la nota
  const activeId = useRef(note.id);

  useEffect(() => {
    //si son diferentes resetea el formulario
    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset]);

  //para editar y actualizar la nota activa
  useEffect(() => {
    dispatch(activeNote(formValue.id, { ...formValue }));
  }, [formValue, dispatch]);

  const handleDileteNote = () => {
    //notificacion y confirmacion
    Swal.fire({
      title: "Estas seguro de eliminar?",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startDelete(id));
      }
    });
  };

  return (
    <div className="notes-main">
      <NotesAppBar />
      <div className="notes-content">
        <input
          type="text"
          name="title"
          placeholder="Igrese un título aquí..."
          className="notes-title"
          value={title}
          onChange={handleInputChange}
        />

        <textarea
          name="body"
          cols="30"
          rows="5"
          placeholder="Que pasó hoy?"
          className="notes-texarea"
          value={body}
          onChange={handleInputChange}
        ></textarea>

        {note.url && (
          <div className="notes-image">
            <img src={note.url} alt="imagen" className="image" />
          </div>
        )}
      </div>
      {/* <i className="fa-solid fa-trash-can fa-3x m-auto" role="button" onClick={handleDileteNote}></i> */}
       <button className="btn btn-danger text-uppercase fw-bold" onClick={handleDileteNote}>
        Delete Note
      </button> 
    </div>
  );
};
