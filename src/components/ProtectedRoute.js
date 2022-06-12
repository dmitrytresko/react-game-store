import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const userLogin = useSelector((state) => state.user?.userName);

  return (
    <Route
      {...rest}
      render={(props) =>
        userLogin ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect to="/"></Redirect>
        )
      }
    />
  );
};

export default ProtectedRoute;
