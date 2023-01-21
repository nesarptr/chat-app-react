import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import routes from "./routes/Routes";
import ApolloProvider from "./ApolloProvider";
import "./index.css";

// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider>
    <RouterProvider router={routes} />
  </ApolloProvider>
);
