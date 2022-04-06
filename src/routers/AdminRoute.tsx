import React from "react";
import { Route, Redirect } from "react-router-dom";
const AdminRoute = ({ component, isLoggedIn, isAdmin, ...rest }) => {
  const Component = component;

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn && isAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect to={"/login"} />
        )
      }
    />
  );
};

export default AdminRoute;
