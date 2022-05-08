import { types } from "../types/types";

const initialState = {
  notes: [],
  active: null,
};
export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.notesActive:
      return {
        ...state,
        active: { ...action.payload },
      };

    case types.notesAddNew:
      return {
        ...state,
        notes: [action.payload, ...state.notes],//añadimos al principio(ya se envió desestructurado), seguido del resto de las notas
      };

    case types.notesLoad:
      return {
        ...state,
        notes: [...action.payload],
      };

    case types.notesUpdate:
      return {
        ...state,
        //solo actualizamos la nota editada, si el id enviado y el id de la nota del estado coincide
        notes: state.notes.map((note) => (note.id === action.payload.id ? action.payload.note : note)),
      };

    case types.notesDelete:
      return {
        ...state,
        active: null,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };

    case types.notesLogoutCleaning:
      return {
        ...state,
        active: null,
        notes: [],
      };

    default:
      return state;
  }
};
