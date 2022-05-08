import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { starLogout } from "../../actions/auth";
import { startNewNote } from "../../actions/notes";
import { JournalEntries } from "./JournalEntries";
import "../../styles/sidebar.css";

export const SideBar = () => {

  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth);

  const handlerLogout = () => {
    dispatch(starLogout());
  };

  const handlerAddNew=()=>{
    dispatch(startNewNote());
  }

  return (
    <aside>
      <div className="d-flex justify-content-between">
        <h3 className="mt-4 ">
          <i className="far fa-user"></i>
          <span className="fw-bold"> {name}</span>
        </h3>
        <button className="btn btn-outline-light mt-3 fw-bold" onClick={handlerLogout}>
          Logout
        </button>
      </div>

      <div onClick={handlerAddNew} className="d-flex justify-content-center flex-column text-center mt-3 w-100">
        <i className="far fa-calendar-plus fa-5x" role="button"></i>
        <p className="mt-2 fw-bold">New entry</p>
      </div>

      <JournalEntries />
    </aside>
  );
};
