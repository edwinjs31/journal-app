import Swal from "sweetalert2";
import { db } from "../firebase/firebaseConfig";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

//funcion asíncrona para agregar nueva nota en firebase y asignar como nota activa
export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth; //se obtine el uid del store(quien tiene todos los estados)
    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };
    //agregamos en la coleccion que se llama igual que el uid del usuario a la ruta indicada,devuelve la referencia del note (doc)
    const doc = await db.collection(`${uid}/journal/notes`).add(newNote);
    dispatch(activeNote(doc.id, newNote));
    dispatch(addNewNote(doc.id, newNote));
  };
};

//accion para obtener la nota activa, retorna un objeto
export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: { id, ...note },
});

//funcion asíncrona para traer las notas de firebase
export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

//accion para agregar nueva nota al store, devuelve un objeto
export const addNewNote = (id, note) => ({
  type: types.notesAddNew,
  payload: {
    id,
    ...note,
  },
});

//accion para modificar notas, devulve un objeto
export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes, //no desestructuramos por que al traer las notas siempre se crea un nuevo array con todas las notas
});

//accion para actualizar las notas, devuleve un objeto
export const refreshNotes = (id, note) => ({
  type: types.notesUpdate,
  payload: { id, note },
});

//funcion asíncrona para guardar la actualizacion de las notas en firebase y en el store
export const startSaveNotes = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    // para no guardar url undefinet
    if (!note.url) {
      delete note.url;
    }
    //debemos eliminar el id, no necesitamos guardar, para eso clonamos 'note'
    const noteFirestore = { ...note };
    delete noteFirestore.id;

    try {
      await db.doc(`${uid}/journal/notes/${note.id}`).update(noteFirestore);

      //actualizamos las notas del store,le pasamos el id y la nota sin id
      dispatch(refreshNotes(note.id, note));

      Swal.fire("Save", note.title, "success");
    } catch (error) {
      Swal.fire("Error", error, "error");
    }
  };
};

//funcion asíncrona que se encarga de subir la imagen al servidor y obtener la url de dicha imagen
//
export const startUploadImage = (file) => {
  return async (dispatch, getState) => {
    const { active: activeNote } = getState().notes;
    //ventana de notificacion
    Swal.fire({
      title: "Uploading...",
      text: "Please wait...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    //obtenemos la url y la asignamos a la nota activa y mandamos la accion para guardar la nota
    const fileUrl = await fileUpload(file);
    activeNote.url = fileUrl;
    dispatch(startSaveNotes(activeNote));
    Swal.close();
  };
};

//funcion asíncrona para borrar una nota de la bd y del store
export const startDelete = (idNote) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;
    //notificacion
    Swal.fire({
      title: "Deleting...",
      text: "Please wait...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    await db.doc(`${uid}/journal/notes/${idNote}`).delete();
    dispatch(deleteNote(idNote));

    Swal.close();
  };
};

//accion para borrar una nota, devuelve un objeto
export const deleteNote = (idNote) => ({
  type: types.notesDelete,
  payload: idNote,
});

//accion para limpiar las notas al cerrar sesion
export const noteLogout = () => ({
  type: types.notesLogoutCleaning,
});
