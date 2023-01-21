import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import AuthProvider from "./context/AuthProvider";
import routes from "./routes/Routes";
import ApolloProvider from "./ApolloProvider";
import "./index.css";

// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ApolloProvider>
      <RouterProvider router={routes} />
    </ApolloProvider>
  </AuthProvider>
);
