import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "../../../context/ThemeContext";
import MovieDetails from "./index";
import { useQuery } from "@tanstack/react-query";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: any) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

function renderWithRoutes(
  ui: React.ReactElement,
  initialEntry: string = "/movies/1"
) {
  return render(
    <ThemeProvider>
      <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
          <Route path="/movies/:id" element={ui} />
          <Route path="/movies" element={<div>Movies List Page</div>} />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>
  );
}

jest.mock("@tanstack/react-query", () => ({
  __esModule: true,
  useQuery: jest.fn(),
}));

const sampleMovie = {
  title: "A New Hope",
  episode_id: 4,
  opening_crawl: "It is a period of civil war...",
  director: "George Lucas",
  producer: "Gary Kurtz, Rick McCallum",
  release_date: "1977-05-25",
  species: [],
  starships: [],
  vehicles: [],
  characters: [
    "https://swapi.dev/api/people/1/",
    "https://swapi.dev/api/people/2/",
  ],
  planets: [],
  url: "https://swapi.dev/api/films/1/",
  created: "",
  edited: "",
};

const sampleCharacters = [{ name: "Luke Skywalker" }, { name: "C-3PO" }];

describe("MovieDetails page", () => {
  beforeEach(() => {
    (useQuery as unknown as jest.Mock).mockReset();
  });

  test("mostra Skeleton quando carregando e sem filme", () => {
    (useQuery as unknown as jest.Mock).mockImplementation(({ queryKey }) => {
      const key = Array.isArray(queryKey) ? queryKey[0] : queryKey;
      if (key === "movie") {
        return { data: undefined, isLoading: true, error: null };
      }
      if (key === "characters") {
        return { data: [], isLoading: false, error: null };
      }
      return {};
    });

    const { container } = renderWithRoutes(<MovieDetails />);

    expect(container.querySelector(".ant-skeleton")).toBeInTheDocument();
    expect(screen.queryByText(/A New Hope/i)).toBeNull();
  });

  test("renderiza detalhes do filme e lista de personagens", () => {
    (useQuery as unknown as jest.Mock).mockImplementation(({ queryKey }) => {
      const key = Array.isArray(queryKey) ? queryKey[0] : queryKey;
      if (key === "movie") {
        return { data: sampleMovie, isLoading: false, error: null };
      }
      if (key === "characters") {
        return { data: sampleCharacters, isLoading: false, error: null };
      }
      return {};
    });

    renderWithRoutes(<MovieDetails />);

    expect(screen.getByText(/A New Hope/i)).toBeInTheDocument();
    expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
  });

  test("ao clicar em Back, navega para /movies", () => {
    (useQuery as unknown as jest.Mock).mockImplementation(({ queryKey }) => {
      const key = Array.isArray(queryKey) ? queryKey[0] : queryKey;
      if (key === "movie") {
        return { data: sampleMovie, isLoading: false, error: null };
      }
      if (key === "characters") {
        return { data: sampleCharacters, isLoading: false, error: null };
      }
      return {};
    });

    renderWithRoutes(<MovieDetails />);

    const back = screen.getByText(/Back/i);
    fireEvent.click(back);

    expect(screen.getByText(/Movies List Page/i)).toBeInTheDocument();
  });
});
