import { db } from "../firebase/firebaseConfig";

//obtiene las tareas de firebase, esta funcion se implementará donde tengamos el 'uid' (AppRouter)
export const loadNotes = async (uid) => {
  //devuelve un objeto por cada nota que contiene toda la informacion incluida la 'data'
  const notesSnap = await db.collection(`${uid}/journal/notes`).get();
  const notes = [];
  //extraemos el id y las notas, para agregar a un nuevo array de notas
  notesSnap.forEach((snapHijo) => {
    notes.push({
      id: snapHijo.id,
      ...snapHijo.data(),
    });
  });
  return notes;
};
