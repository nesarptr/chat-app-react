import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Header from "../components/ui/Header";
import Error404 from "../components/ui/Error404";
import App from "../Pages/App";
import Register from "../Pages/auth/Register";
import Login from "../Pages/auth/Login";

const routes = createBrowserRouter([
  {
    element: <Header />,
    children: [
      {
        path: "/",
        element: <App />,
        errorElement: <Error404 />,
      },
      {
        path: "/register",
        element: <Register />,
        errorElement: <Error404 />,
      },
      {
        path: "/login",
        element: <Login />,
        errorElement: <Error404 />,
      },
    ],
  },
]);

export default routes;
