import React from "react";
import { useRoutes } from "react-router-dom";
import * as Pages from "../pages";
import Spiner from "../components/Spiner";

export const routes = [
  {
    path: "/",
    element: <Pages.Dashboard />,
    // children: [
    //   { index: true, element: <BestSeller /> },
    //   { path: "laptop", element: <Laptop /> },
    //   { path: "desktop", element: <Desktop /> },
    // ],
  },
  {
    path: "/products",
    element: <Pages.Product />,
    children: [
      {
        path: "create",
        element: (
          <React.Suspense fallback={<Spiner />}>
            <Pages.Create />
          </React.Suspense>
        ),
      },
      {
        path: "update/:id",
        element: (
          <React.Suspense fallback={<Spiner />}>
            <Pages.Update />
          </React.Suspense>
        ),
      },
    ],
  },
  {
    path: "/categories/*",
    element: (
      <React.Suspense fallback={<Spiner />}>
        <Pages.Category />
      </React.Suspense>
    ),
  },
  { path: "/collects", element: <Pages.Collect /> },
  { path: "/users", element: <Pages.User /> },
  { path: "/rates", element: <Pages.Rate /> },
  { path: "/routes", element: <Pages.Router /> },
  { path: "/profiles", element: <Pages.Profile /> },
  { path: "/settings", element: <Pages.Setting /> },

  { path: "*", element: <Pages.NotFound /> },
];

export const Router: React.FC = () => {
  const element = useRoutes(routes);

  return element;
};
