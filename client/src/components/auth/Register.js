import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { Box, Button, FormField, TextInput } from "grommet";

import { AuthContext } from "../../auth/auth";

export default function Register({ history }) {
  // todo: errors my friend...
  const { user, registerUser, errors = {} } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

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
          <b>Register</b> below
        </h4>
        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
      <form
        noValidate
        onSubmit={e => {
          e.preventDefault();

          const newUser = {
            name,
            email,
            password,
            password2
          };

          registerUser(newUser, history);
        }}
      >
        <div>
          <FormField label="Name">
            <TextInput
              placeholder="type here"
              onChange={event => setName(event.target.value)}
              value={name}
              error={errors.name}
              id="name"
              type="text"
              className={classnames("", {
                invalid: errors.name
              })}
            />
          </FormField>
          <span style={{ color: "red" }}>{errors.name}</span>
        </div>
        <div>
          <FormField label="Email">
            <TextInput
              placeholder="type here"
              onChange={event => setEmail(event.target.value)}
              value={email}
              error={errors.email}
              id="email"
              type="email"
              className={classnames("", {
                invalid: errors.email
              })}
            />
          </FormField>
          <span style={{ color: "red" }}>{errors.email}</span>
        </div>
        <div>
          <FormField label="Password">
            <TextInput
              placeholder="type here"
              onChange={event => setPassword(event.target.value)}
              value={password}
              error={errors.password}
              id="password"
              type="password"
              className={classnames("", {
                invalid: errors.password
              })}
            />
          </FormField>
          <span style={{ color: "red" }}>{errors.password}</span>
        </div>
        <div>
          <FormField label="Confirm Password">
            <TextInput
              placeholder="type here"
              onChange={event => setPassword2(event.target.value)}
              value={password2}
              error={errors.password2}
              id="password2"
              type="password"
              className={classnames("", {
                invalid: errors.password2
              })}
            />
          </FormField>
          <span style={{ color: "red" }}>{errors.password2}</span>
        </div>
        <div style={{ paddingLeft: "11.250px" }}>
          <Button type="submit" label="Sign up" />
        </div>
      </form>
    </Box>
  );
}
