import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import Characters from "../pages/Characters";
import Movies from "../pages/Movies";
import AppLayout from "../components/AppLayout";
import MovieDetails from "../pages/Movies/MovieDetails";
import CharacterDetails from "../pages/Characters/CharacterDetail";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/characters", element: <Characters /> },
      { path: "/characters/:id", element: <CharacterDetails /> },
      { path: "/movies", element: <Movies /> },
      { path: "/movies/:id", element: <MovieDetails /> },
    ],
  },
]);

export default router;
