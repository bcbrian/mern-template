import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../auth/auth";

export default function Login({ history }) {
  // todo: errors my friend...
  const { user, loginUser, errors = {} } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

        const userData = {
          email,
          password
        };

        loginUser(userData);
      }}
    >
      <div>
        <label htmlFor="email">Email</label>
        <input
          placeholder="type here"
          onChange={e => setEmail(e.target.value)}
          value={email}
          error={errors.email}
          id="email"
          type="email"
          className="email"
        />

        <span>
          {errors.email}
          {errors.emailnotfound}
        </span>
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          placeholder="type here"
          onChange={e => setPassword(e.target.value)}
          value={password}
          error={errors.password}
          id="password"
          type="password"
        />

        <span>
          {errors.password}
          {errors.passwordincorrect}
        </span>
      </div>
      <div>
        <button type="submit">login</button>
      </div>
    </form>
  );
}
