import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startSaveNotes, startUploadImage } from "../../actions/notes";
//libreria de manejo de fechas
import moment from "moment";
import "moment/locale/es";

export const NotesAppBar = () => {
  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.notes);

  //manejo de fechas
  const noteDate=moment(active.date);
  
  //guarda en firebase la nota actualizada
  const handleSaveNote = () => {
    dispatch(startSaveNotes(active));
  };

  //evento onChange se dispara cuando se ha seleccionado una imagen de la caja y devuelve un array de imagenes
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if(file){//si está la imagen
      dispatch(startUploadImage(file));
    }
  };

  //este evento click encadena otro evento click al input de la caja de imagen que está invisible.
  const handleUploadImage = () => {
    document.getElementById("fileSelector").click();
  };

  return (
    <div className="notes-appbar">
      <span className="fw-bold">{noteDate.format('LL')}</span>

      <input type="file" id="fileSelector" name="file" style={{ display: "none" }} onChange={handleFileChange} />
      
      <div>
        <button className="btn btn-outline-light fw-bold" onClick={handleUploadImage}>
          Picture
        </button>
      </div>

      <div>
        <button className="btn btn-outline-light fw-bold" onClick={handleSaveNote}>
          Save
        </button>
      </div>
    </div>
  );
};
