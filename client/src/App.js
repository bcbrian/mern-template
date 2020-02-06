import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Grommet } from "grommet";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Interactions from "./components/interactions/Interactions";

import { Auth } from "./auth/auth";

import "./App.css";

const theme = {
  global: {
    colors: {
      "light-2": "#f5f5f5",
      text: {
        light: "rgba(0, 0, 0, 0.87)"
      },
      primary: "#303f9f"
    },
    edgeSize: {
      small: "14px"
    },
    elevation: {
      light: {
        medium:
          "0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)"
      }
    },
    font: {
      size: "14px",
      height: "20px"
    }
  },
  button: {
    border: {
      width: "1px",
      radius: "4px"
    },
    padding: {
      vertical: "8px",
      horizontal: "16px"
    },
    extend: props => `
         text-transform: uppercase;
         font-size: 0.875rem;
         font-weight: 500;
         line-height: normal;
    `
      //   ${!props.primary &&
      //     `
      //     border-color: ${rgba(
      //       normalizeColor(props.colorValue, props.theme),
      //       0.5
      //     )};
      //     color: ${normalizeColor(props.colorValue, props.theme)};
      //     :hover {
      //        box-shadow: none;
      //        background-color: ${rgba(
      //          normalizeColor(props.colorValue, props.theme),
      //          0.08
      //        )};
      //      }
      //    `}
      //  `
  }
};

export default function() {
  return (
    <Grommet theme={theme}>
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
    </Grommet>
  );
}
