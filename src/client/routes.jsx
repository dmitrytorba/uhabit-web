import React from "react";
import PropTypes from "prop-types";
import Home from "./components/home";
import Create from "./components/create";
import Login from "./components/login";
import Signup from "./components/signup";
import { withRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";

const Root = ({ route, children }) => {
  return (
    <div>
      {renderRoutes(route.routes)}
      {children}
    </div>
  );
};

Root.propTypes = {
  route: PropTypes.object,
  children: PropTypes.object
};

const routes = [
  {
    path: "/",
    component: withRouter(Root),
    init: "./init-top",
    routes: [
      {
        path: "/",
        exact: true,
        component: Home
      },
      {
        path: "/create",
        exact: true,
        component: Create 
      },
      {
        path: "/login",
        exact: true,
        component: Login
      },
      {
        path: "/signup",
        exact: true,
        component: Signup 
      }
    ]
  }
];

export { routes };
