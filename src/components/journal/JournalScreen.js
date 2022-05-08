import React from "react";
import { useSelector } from "react-redux";
import { NoteScreen } from "../notes/NoteScreen";
import { SideBar } from "./Sidebar";
import { NothingSelected } from "./NothingSelected";

export const JournalScreen = () => {
  const { active } = useSelector((state) => state.notes);

  return (
    <div className="d-flex">
      <SideBar />
      <main className="w-100">
        {(active) ? (<NoteScreen />) : (<NothingSelected />) }
      </main>
    </div>
  );
};
