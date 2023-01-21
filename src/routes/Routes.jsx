import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Header from "../components/ui/Header";
import Error404 from "../components/ui/Error404";
import App from "../Pages/App";
import Register from "../Pages/auth/Register";
import Login from "../Pages/auth/Login";
import { PrivateRoute, NonAuthRoute } from "./ProtectedRoutes";

const routes = createBrowserRouter([
  {
    element: <Header />,
    errorElement: <Error404 />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <App />
          </PrivateRoute>
        ),
        errorElement: <Error404 />,
      },
      {
        path: "/register",
        element: (
          <NonAuthRoute>
            <Register />
          </NonAuthRoute>
        ),
        errorElement: <Error404 />,
      },
      {
        path: "/login",
        element: (
          <NonAuthRoute>
            <Login />
          </NonAuthRoute>
        ),
        errorElement: <Error404 />,
      },
    ],
  },
]);

export default routes;
