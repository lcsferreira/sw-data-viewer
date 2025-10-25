import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ThemeProvider } from "../../context/ThemeContext";
import Movies from "./index";

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

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <ThemeProvider>
      <MemoryRouter initialEntries={["/movies"]}>{ui}</MemoryRouter>
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
  characters: [],
  planets: [],
  url: "https://swapi.dev/api/films/1/",
  created: "",
  edited: "",
};

describe("Movies page", () => {
  beforeEach(() => {
    (useQuery as unknown as jest.Mock).mockReset();
  });

  test("renderiza barra de busca, botão Back e spinner em loading", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isFetching: false,
    });

    renderWithProviders(<Movies />);

    expect(
      screen.getByPlaceholderText(/Search for movies/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/Back/i)).toBeInTheDocument();

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  test("lista filmes quando a API retorna resultados e links corretos", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: { count: 1, next: null, previous: null, results: [sampleMovie] },
      isLoading: false,
      isFetching: false,
    });

    renderWithProviders(<Movies />);

    expect(screen.getByText(/A New Hope/i)).toBeInTheDocument();

    const links = screen.getAllByRole("link");
    const detailsLink = links.find(
      (a) => a.getAttribute("href") === "/movies/1"
    );
    expect(detailsLink).toBeTruthy();
  });

  test("quando clicar no card navega para a rota de detalhes /movies/:id", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: { count: 1, next: null, previous: null, results: [sampleMovie] },
      isLoading: false,
      isFetching: false,
    });

    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={["/movies"]}>
          <Routes>
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:id" element={<div>Movie Details Page</div>} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    );

    const title = screen.getByText(/A New Hope/i);
    fireEvent.click(title);

    expect(screen.getByText(/Movie Details Page/i)).toBeInTheDocument();
  });
});
