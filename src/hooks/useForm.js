import { useState } from "react";

//ESTE CUSTOM KOOK SE ENCARGA DE MANEJAR LOS FORMULARIOS

export const useForm = (initialState = {}) => {
  //recibe un objeto con los datos/campos del formulario, al cual se quiere modificar.
  const [formValue, setValueForm] = useState(initialState);

  //para inicializar el formulario
  const reset = (newFormState = initialState) => {
    setValueForm(newFormState);
  };

  //evento onChange, para cambiar el valor de los elementos
  const handleInputChange = ({ target }) => {
    setValueForm({ ...formValue, [target.name]: target.value });
  };

  //retornamos el objeto con los datos del form,la funcion del evento y la funcion reset
  return [formValue, handleInputChange, reset];
};
