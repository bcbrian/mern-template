import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Interactions from "./components/interactions/Interactions";

import { Auth } from "./auth/auth";

import "./App.css";

export default function() {
  return (
    <Auth>
      <Router>
        <div className="App">
          {/* <Navbar /> */}
          <div>
            <Route exact path="/" component={Register} />
          </div>
          <div>
            <Route exact path="/" component={Login} />
          </div>
          <div>
            <Route exact path="/" component={Interactions} />
          </div>
          <div>
            <PrivateRoute exact path="/" component={Dashboard} />
          </div>
          <div>
            <PrivateRoute exact path="/" component={Interactions} />
          </div>
        </div>
      </Router>
    </Auth>
  );
}
