import React from "react";
import { useDispatch } from "react-redux";
import { activeNote } from "../../actions/notes";
//libreria de manejo de fechas
import moment from "moment";
import "moment/locale/es";

import "../../styles/journal.css";

//ya no envian la props desestructurada por eso no hace falta desestructurar qui
export const JournalEntry = (nota) => {

  const { id, date, title, body, url } = nota;
  const dispatch = useDispatch();

  //libreria 'moment' para expresar fechas
  const noteDate = moment(date);

  const handleEntryClick = () => {
    dispatch(activeNote(id, nota));
  };
  
  return (
    <div onClick={handleEntryClick} className="entry">
      {url && (
        <div
          className="entries-picture"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url(${url})`,
          }}
        ></div>
      )}

      <div className="jourlal-body">
        <p className="jourlal-title">{title}</p>
        <p className="jourlal-content">{body}</p>
      </div>

      <div className="journal-date">
        <span className="fs-6 fw-bold">{noteDate.format("dddd")}</span>
        <h4>{noteDate.format("DD")}</h4>
      </div>
    </div>
  );
};
