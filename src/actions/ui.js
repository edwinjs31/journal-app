import { types } from "../types/types";

//GESTION DE ACCIONES DEL ERROR

//recibe un error 'err' es un string, y retorna una accion
export const setErrorAction = (err) => ({
  type: types.uiSetError,
  payload: err,
});

export const removeErrorAction = () => ({
  type: types.uiRemoveError,
});

export const startLoading = () => ({
  type: types.uiStartLoading,
});

export const finishLoading = () => ({
  type: types.uiFinishLoading,
});
/*
export const uiSetNotificationAction = (notification) => ({
  type: types.uiSetNotification,
  payload: notification,
});

export const removeNotificationAction = () => ({
  type: types.uiRemoveNotification,
});
*/
