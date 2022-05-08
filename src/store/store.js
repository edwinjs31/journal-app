import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from 'redux-thunk';
import { autReducer } from "../reducers/authReducer";
import { notesReducer } from "../reducers/notesReducer";
import { uiReducer } from "../reducers/uiReducer";

//IMPLEMENTACION DE REDUX MIDDLEWARE Y THUNK(ACCIONES ASÍNCRONAS)

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

//aunte solo se tenga un reducer combiene crear de esta forma para un futuro agregar reducers
const reducers = combineReducers({
    auth: autReducer,
    ui: uiReducer,
    notes: notesReducer,
})

//se debe implementar en el componente mas alto de la aplicacion
export const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk))
);