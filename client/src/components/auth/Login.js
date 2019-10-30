import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Box, Button, FormField, TextInput } from "grommet";
import { AuthContext } from "../../auth/auth";

export default function Login({ history }) {
  // todo: errors my friend...
  const { user, loginUser, errors = {} } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (user) {
      history.push("/dashboard");
    }
  }, [user, history]);

  return (
    <Box justify="center" align="center" style={{ marginTop: "4rem" }}>
      <Link to="/">Back to home</Link>
      <div style={{ paddingLeft: "11.250px" }}>
        <h4>
          <b>Login</b> below
        </h4>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
      <form
        noValidate
        onSubmit={e => {
          e.preventDefault();

          const userData = {
            email,
            password
          };

          loginUser(userData);
        }}
      >
        <div>
          <FormField label="Email">
            <TextInput
              placeholder="type here"
              onChange={e => setEmail(e.target.value)}
              value={email}
              error={errors.email}
              id="email"
              type="email"
              className={classnames("", {
                invalid: errors.email || errors.emailnotfound
              })}
            />
          </FormField>

          <span style={{ color: "red" }}>
            {errors.email}
            {errors.emailnotfound}
          </span>
        </div>
        <div>
          <FormField label="Password">
            <TextInput
              placeholder="type here"
              onChange={e => setPassword(e.target.value)}
              value={password}
              error={errors.password}
              id="password"
              type="password"
              className={classnames("", {
                invalid: errors.password || errors.passwordincorrect
              })}
            />
          </FormField>

          <span style={{ color: "red" }}>
            {errors.password}
            {errors.passwordincorrect}
          </span>
        </div>
        <div style={{ paddingLeft: "11.250px" }}>
          <Button type="submit" label="login" />
        </div>
      </form>
    </Box>
  );
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
