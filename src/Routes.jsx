import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Error404 from "./components/ui/Error404";
import App from "./App";
import Register from "./Pages/auth/Register";

const routes = createBrowserRouter([
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
]);

export default routes;
