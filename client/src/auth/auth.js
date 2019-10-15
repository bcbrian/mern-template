import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

import setAuthToken from "../utils/setAuthToken";

// Create user context to get user in nested pages
export const AuthContext = React.createContext("auth");

export const logoutUser = cb => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  cb({});
};

export const loginUser = cb => userData => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to localStorage

      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      cb(decoded);
    })
    .catch(
      err => {
        console.log(err);
      }
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: err.response.data
      // })
    );
};

export const registerUser = cb => (userData, history) => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(
      err => {
        console.log(err);
      }
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: err.response.data
      // })
    );
};

export function useAuth() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (localStorage.jwtToken) {
      // Set auth token header auth
      const token = localStorage.jwtToken;
      setAuthToken(token);
      // Decode token and get user info and exp
      const decoded = jwt_decode(token);
      // Set user and isAuthenticated
      setUser(decoded);
      // Check for expired token
      const currentTime = Date.now() / 1000; // to get in milliseconds
      if (decoded.exp < currentTime) {
        // Logout user
        logoutUser(setUser);

        // Redirect to login
        window.location.href = "./login";
      }
    }
  }, []);

  return {
    user,
    loginUser: loginUser(setUser),
    logoutUser: () => logoutUser(setUser),
    registerUser: registerUser(setUser)
  };
}

export function Auth({ children }) {
  const { user, loginUser, logoutUser, registerUser } = useAuth;

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
