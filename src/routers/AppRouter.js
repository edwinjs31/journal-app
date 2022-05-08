import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { JournalScreen } from "../components/journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";
import { firebase } from "../firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import { LoadingScreen } from "../components/loading/LoadingScreen";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { startLoadingNotes } from "../actions/notes";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true); //revisa si está resuelto el stado de firebase
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    //contiene el estado de autenticacion del usuario(todos sus datos)
    firebase.auth().onAuthStateChanged( (user) => {
      //si el usuario está autenticado(en caso contrario user.uid es null)
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsAuthenticated(true);
        dispatch(startLoadingNotes(user.uid)); //de paso traemos las notas de firebase(devuelve una promesa)
      } else {
        setIsAuthenticated(false);
      }

      setChecking(false);
    });
  }, [dispatch, checking, isAuthenticated]);

  //componente que se mostrará en toda la pantalla
  if (checking) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute isAuthenticated={isAuthenticated} path="/auth" component={AuthRouter} />
          <PrivateRoute exact isAuthenticated={isAuthenticated} path="/" component={JournalScreen} />
          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
};
