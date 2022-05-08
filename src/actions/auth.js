import { types } from "../types/types";
import { firebase, googleAutProvider } from "../firebase/firebaseConfig";
import { finishLoading, setErrorAction, startLoading } from "./ui";
import { noteLogout } from "./notes";
//estas acciones son simples funciones

//probando acciones asíncronas con setTimeout y usuario predeterminado
export const startLoginEmailPassword = (email, password) => {
  //se puede hacer varios dispatch
  return (dispatch) => {
    //loadding 'true'
    dispatch(startLoading());
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
        //loading 'false'
        dispatch(finishLoading());
      })
      .catch(({ message }) => {
        dispatch(setErrorAction(message));
        dispatch(finishLoading());
      });
  };
};

//añadiendo nuevo usuario con firebase
export const startRegisterNewUser = (email, password, name) => {
  //retorna un callback/dispatch
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name });
        dispatch(login(user.uid, user.displayName));
      })
      .catch(({ message }) => dispatch(setErrorAction(message)));
  };
};

//Inicio de sesion con google, retornará una promesa
export const startGoogleLogin = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleAutProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      });
  };
};

//Funcion asíncrona para cerrar sesion en firebase y limpia el estado en la app
export const starLogout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();
    dispatch(logout());
    dispatch(noteLogout());
  };
};

//Esta funcion será utilizada en todas las acciones: retorna una accion/objeto con un type y un payload(uid,displayName).
export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});

//funcion para cerrar sesion retorna un type
export const logout = () => ({
  type: types.logout,
});
