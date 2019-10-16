import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { AuthContext } from "../../auth/auth";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};
