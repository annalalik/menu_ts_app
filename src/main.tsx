import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { Home } from "./components/Home";
import { Menu } from "./components/MenuPage/Menu";
import { Order } from "./components/OrderPage/Order";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Home name="Nasza 'Dobra' Kawiarnia" subname="A Może coś więcej..." />
        ),
      },
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "order",
        element: <Order />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
