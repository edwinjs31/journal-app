import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
//actions
import { removeErrorAction, setErrorAction } from "../../actions/ui";
import { startRegisterNewUser } from "../../actions/auth";
import "../../styles/loginRegister.css";

export const RegisterSreen = () => {
  const [formValue, handleInputChange] = useForm({
    name: "kevin",
    email: "kegito@gmail.com",
    password: "1234567",
    password2: "1234567",
  });

  //hook de redux:se encarga de mandar acciones
  const dispatch = useDispatch();
  //otro hook de redux: Para obtener el satado de la 'store'
  const state = useSelector((state) => state);

  //nos interesa el estado de 'ui', que contiene el mensaje de error
  const { msgError } = state.ui;
  const { name, email, password, password2 } = formValue;

  //evento submit del formulario
  const handleSubmitRegister = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(startRegisterNewUser(email, password, name));
    }
  };

  //validacion del formulario y el dispatch envia acciones de error
  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setErrorAction("El nombre es requerido"));
      return false;
    }
    if (!validator.isEmail(email)) {
      dispatch(setErrorAction("El Email no es válido"));
      return false;
    }
    if (password.length < 6) {
      dispatch(setErrorAction("El Password debe tener al menos 6 carácteres"));
      return false;
    }
    if (password !== password2) {
      dispatch(setErrorAction("El Password no coincide"));
      return false;
    }

    dispatch(removeErrorAction());
    return true;
  };

  return (
    <div className="vh-100 d-flex">
      <form onSubmit={handleSubmitRegister} className="register justify-content-center card p-4 m-auto bg-light">
        <h3 className="text-center">Register</h3>

        <div className="alert-error">{msgError}</div>

        <div className="form-group mt-2">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group mt-2">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group mt-2">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group mt-2">
          <label>Confirm Password</label>
          <input
            type="password"
            name="password2"
            className="form-control"
            placeholder="Confirm password"
            value={password2}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="btn btn-outline-primary my-4">
          Register
        </button>
        <p className="forgot-password text-right">
          Already registered <Link to="/auth/login">log in?</Link>
        </p>
      </form>
    </div>
  );
};
