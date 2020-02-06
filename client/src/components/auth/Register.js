import React, { useContext, useState, useEffect } from "react";

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
      // history.push("/dashboard");
    }
  }, [user, history]);

  return (
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
        <label htmlFor="name">Name</label>
        <input
          placeholder="type here"
          onChange={event => setName(event.target.value)}
          value={name}
          error={errors.name}
          id="name"
          type="text"
        />
        <span>{errors.name}</span>
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          placeholder="type here"
          onChange={event => setEmail(event.target.value)}
          value={email}
          error={errors.email}
          id="email"
          type="email"
        />
        <span>{errors.email}</span>
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          placeholder="type here"
          onChange={event => setPassword(event.target.value)}
          value={password}
          error={errors.password}
          id="password"
          type="password"
        />
        <span>{errors.password}</span>
      </div>
      <div>
        <label htmlFor="password2">Confirm Password</label>
        <input
          placeholder="type here"
          onChange={event => setPassword2(event.target.value)}
          value={password2}
          error={errors.password2}
          id="password2"
          type="password"
        />
        <span>{errors.password2}</span>
      </div>
      <div>
        <button type="submit">Sign up</button>
      </div>
    </form>
  );
}
