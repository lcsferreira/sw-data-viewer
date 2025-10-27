import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ThemeProvider } from "../../context/ThemeContext";
import Characters from "./index";

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
      <MemoryRouter initialEntries={["/characters"]}>{ui}</MemoryRouter>
    </ThemeProvider>
  );
}

jest.mock("@tanstack/react-query", () => ({
  __esModule: true,
  useQuery: jest.fn(),
}));

const sampleCharacter = {
  name: "Luke Skywalker",
  birth_year: "19BBY",
  eye_color: "blue",
  gender: "male",
  hair_color: "blond",
  height: "172",
  mass: "77",
  skin_color: "fair",
  homeworld: "https://swapi.dev/api/planets/1/",
  films: ["https://swapi.dev/api/films/1/"],
  species: [],
  starships: [],
  vehicles: [],
  url: "https://swapi.dev/api/people/1/",
  created: "",
  edited: "",
};

describe("Characters page", () => {
  beforeEach(() => {
    (useQuery as unknown as jest.Mock).mockReset();
  });

  test("renderiza barra de busca, botão Back e spinner em loading", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isFetching: false,
    });

    renderWithProviders(<Characters />);

    expect(
      screen.getByPlaceholderText(/Search for characters/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/Back/i)).toBeInTheDocument();

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  test("lista personagens quando a API retorna resultados e links corretos", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        count: 1,
        next: null,
        previous: null,
        results: [sampleCharacter],
      },
      isLoading: false,
      isFetching: false,
    });

    renderWithProviders(<Characters />);

    expect(screen.getAllByText(/Luke Skywalker/i)).toHaveLength(2);

    const links = screen.getAllByRole("link");
    const detailsLink = links.find(
      (a) => a.getAttribute("href") === "/characters/1"
    );
    expect(detailsLink).toBeTruthy();
  });

  test("quando clicar no card navega para a rota de detalhes /characters/:id", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        count: 1,
        next: null,
        previous: null,
        results: [sampleCharacter],
      },
      isLoading: false,
      isFetching: false,
    });

    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={["/characters"]}>
          <Routes>
            <Route path="/characters" element={<Characters />} />
            <Route
              path="/characters/:id"
              element={<div>Character Details Page</div>}
            />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    );

    const title = screen.getAllByText(/Luke Skywalker/i)[0];
    fireEvent.click(title);

    expect(screen.getByText(/Character Details Page/i)).toBeInTheDocument();
  });
});
