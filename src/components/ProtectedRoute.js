import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const userLogin = useSelector(state => state.user?.userName);

  return (
    <Route
        {...rest}
        render={
          props => userLogin ? <Component {...rest} {...props} /> : <Redirect to="/" />
        } />
  )
}

export default ProtectedRoute;
