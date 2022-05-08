import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
//actions
import { startGoogleLogin, startLoginEmailPassword } from "../../actions/auth";
import "../../styles/loginRegister.css";
//import { removeErrorAction, setErrorAction } from "../../actions/ui";
//import validator from "validator";

export const LoginScreen = () => {

  const dispatch = useDispatch();

  const { msgError } = useSelector((state) => state.ui);
  const { loading } = useSelector((state) => state.ui);
  
  const [formValue, handleInputChange] = useForm({
    email: "",
    password: "",
  });

  const { email, password } = formValue;

  //TODO: FALTA CONTROL DE CAMPOS VACIOS
  const handleSubminLogin = (e) => {
    e.preventDefault();

    //llamamos la accion que se encuentra definida en 'auth'
    dispatch(startLoginEmailPassword(email, password));
  };

  //icinicando secion con Google
  const hagleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };

  return (
    <section className="vh-100">
      <div className="container py-3 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-8 col-md-7 col-lg-5 col-xl-4">
            <div className="card bg-dark text-white borde-r">
              <div className="card-body p-4 text-center">
                <div className="mb-md-4 mt-md-3 pb-3">

                  <form onSubmit={handleSubminLogin}>
                    <h2 className="fw-bold mb-3 text-uppercase">Login</h2>
                    {/* error msg */}
                    <div className="alert-error mb-3">{msgError}</div>
                    {/* Email */}
                    <div className="form-outline form-white mb-3">
                      <input
                        type="email"
                        name="email"
                        className="form-control form-control-sm"
                        autoComplete="off"
                        value={email}
                        onChange={handleInputChange}
                      />
                      <label className="form-label">Email</label>
                    </div>
                    {/* Password */}
                    <div className="form-outline form-white mb-3">
                      <input
                        type="password"
                        name="password"
                        className="form-control form-control-sm"
                        value={password}
                        onChange={handleInputChange}
                      />
                      <label className="form-label">Password</label>
                    </div>

                    <p className="small mb-3 pb-lg-2">
                      <Link to="/auth/register" className="text-white-50">
                        Forgot password?
                      </Link>
                    </p>

                    <button disabled={loading} className="btn btn-outline-light btn-lg px-5" type="submit">
                      Login
                    </button>

                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                      <a href="#!" className="text-white">
                        <i className="fab fa-facebook-f fa-lg"></i>
                      </a>
                      <a href="#!" className="text-white">
                        <i className="fab fa-twitter fa-lg mx-4 px-2"></i>
                      </a>
                      <a href="#!" className="text-white" onClick={hagleGoogleLogin}>
                        <i className="fab fa-google fa-lg"></i>
                      </a>
                    </div>
                  </form>
                  
                </div>
                <div>
                  <p className="mb-0">
                    Don't have an account?{" "}
                    <Link to="/auth/register" className="text-white-50 fw-bold">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
