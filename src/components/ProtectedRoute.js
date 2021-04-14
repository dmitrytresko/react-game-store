import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from "./AuthContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <AuthContext.Consumer>
      {value => (
        <Route
        {...rest}
        render={props => (
        value ? <Component {...rest} {...props} /> :<Redirect to="/" />
        )} />
      )}
    </AuthContext.Consumer>
  )
}

export default ProtectedRoute;
