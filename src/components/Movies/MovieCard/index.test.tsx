import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "../../../context/ThemeContext";
import MovieCard from "./index";

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
  characters: [],
  planets: [],
  url: "https://swapi.dev/api/films/1/",
  created: "",
  edited: "",
} as any;

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <ThemeProvider>
      <MemoryRouter initialEntries={["/movies"]}>{ui}</MemoryRouter>
    </ThemeProvider>
  );
}

describe("MovieCard", () => {
  test("renderiza título, data formatada e link correto", () => {
    renderWithProviders(<MovieCard movie={sampleMovie} loading={false} />);

    expect(screen.getByText(/A New Hope/i)).toBeInTheDocument();
    // Data formatada por dayjs("1977-05-25").format("DD/MM/YYYY")
    expect(screen.getByText(/25\/05\/1977/i)).toBeInTheDocument();
    expect(screen.getByText(/Episode 4/i)).toBeInTheDocument();

    const links = screen.getAllByRole("link");
    const detailsLink = links.find(
      (a) => a.getAttribute("href") === "/movies/1"
    );
    expect(detailsLink).toBeTruthy();
  });

  test("navega para detalhes ao clicar", () => {
    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={["/movies"]}>
          <Routes>
            <Route
              path="/movies"
              element={<MovieCard movie={sampleMovie} loading={false} />}
            />
            <Route path="/movies/:id" element={<div>Movie Details Page</div>} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText(/A New Hope/i));
    expect(screen.getByText(/Movie Details Page/i)).toBeInTheDocument();
  });
});
