import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, userLogin, ...rest }) => {
  return (
    <Route
    {...rest}
    render={props => (
      userLogin ? <Component {...rest} {...props} /> :<Redirect to="/" />
    )} />
  )
}

export default ProtectedRoute;
