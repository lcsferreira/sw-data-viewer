import { Outlet, createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import Characters from "../pages/Characters";
// import People from "../pages/People";
// import { Home } from "../pages/Home";
import Movies from "../pages/Movies";
// import CustomHeader from "../components/CustomHeader";
// import Character from "../pages/Character";
import { RouteLayout } from "./style";
import AppLayout from "../components/AppLayout";
// import Movie from "../pages/Movie";
// import Planets from "../pages/Planets";
// import Startships from "../pages/Starships";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/characters", element: <Characters /> },
      // { path: "/characters/:id", element: <Character /> },
      { path: "/movies", element: <Movies /> },
      // { path: "/movies/:id", element: <Movie /> },
      // {
      //   path: "/planets",
      //   element: <Planets />,
      // },
      // {
      //   path: "/starships",
      //   element: <Startships />,
      // },
    ],
  },
]);

export default router;
