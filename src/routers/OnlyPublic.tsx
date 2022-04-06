import React from "react";
import { Route, Redirect } from "react-router-dom";
const OnlyPublicRoute = ({ component, isLoggedIn, ...rest }) => {
  const Component = component;
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? <Redirect to={"/"} /> : <Component {...props} />
      }
    />
  );
};

export default OnlyPublicRoute;
