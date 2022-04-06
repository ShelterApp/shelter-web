import React from "react";
import { Route, Redirect } from "react-router-dom";
const PrivateRoute = ({ component, isLoggedIn, ...rest }) => {
  const Component = component;

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? <Component {...props} /> : <Redirect to={"/login"} />
      }
    />
  );
};

export default PrivateRoute;
