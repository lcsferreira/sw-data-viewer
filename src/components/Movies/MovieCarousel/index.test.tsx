import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "../../../context/ThemeContext";
import MovieCarousel from "./index";
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

jest.mock("@tanstack/react-query", () => ({
  __esModule: true,
  useQuery: jest.fn(),
}));

const makeMovie = (id: number) => ({
  title: `Movie ${id}`,
  episode_id: id,
  opening_crawl: "...",
  director: "Dir",
  producer: "Prod",
  release_date: "1977-05-25",
  species: [],
  starships: [],
  vehicles: [],
  characters: [],
  planets: [],
  url: `https://swapi.dev/api/films/${id}/`,
  created: "",
  edited: "",
});

function renderWithRoutes(ui: React.ReactElement) {
  return render(
    <ThemeProvider>
      <MemoryRouter initialEntries={["/from"]}>
        <Routes>
          <Route path="/from" element={ui} />
          <Route path="/movies/:id" element={<div>Movie Details Page</div>} />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>
  );
}

describe("MovieCarousel", () => {
  beforeEach(() => {
    (useQuery as unknown as jest.Mock).mockReset();
  });

  test("renderiza cards dos filmes e navega ao clicar", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: [makeMovie(1), makeMovie(2)],
      isLoading: false,
      error: null,
    });

    renderWithRoutes(
      <MovieCarousel
        loading={false}
        filmsUrls={["/api/films/1/", "/api/films/2/"]}
      />
    );

    expect(screen.getAllByText(/Movie 1/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Movie 2/i)[0]).toBeInTheDocument();

    fireEvent.click(screen.getAllByText(/Movie 1/i)[0]);
    expect(screen.getByText(/Movie Details Page/i)).toBeInTheDocument();
  });
});
