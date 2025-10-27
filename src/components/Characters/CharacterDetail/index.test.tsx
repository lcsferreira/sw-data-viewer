import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "../../../context/ThemeContext";
import CharacterDetail from "./index";
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
} as any;

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <ThemeProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </ThemeProvider>
  );
}

describe("CharacterDetail", () => {
  beforeEach(() => {
    (useQuery as unknown as jest.Mock).mockReset();
  });

  test("mostra Skeletons para homeworld e species enquanto carregam", () => {
    (useQuery as unknown as jest.Mock).mockImplementation(({ queryKey }) => {
      const key = Array.isArray(queryKey) ? queryKey[0] : queryKey;
      if (key === "homeworld") return { data: undefined, isLoading: true };
      if (key === "species") return { data: undefined, isLoading: true };
      return {};
    });

    const { container } = renderWithProviders(
      <CharacterDetail character={sampleCharacter} loading={false} />
    );

    expect(container.querySelectorAll(".ant-skeleton").length).toBeGreaterThan(
      0
    );
  });

  test("renderiza dados formatados quando homeworld e species carregam", () => {
    (useQuery as unknown as jest.Mock).mockImplementation(({ queryKey }) => {
      const key = Array.isArray(queryKey) ? queryKey[0] : queryKey;
      if (key === "homeworld")
        return { data: { name: "Tatooine" }, isLoading: false };
      if (key === "species")
        return { data: [{ name: "Human" }], isLoading: false };
      return {};
    });

    renderWithProviders(
      <CharacterDetail character={sampleCharacter} loading={false} />
    );

    expect(screen.getAllByText(/Luke Skywalker/i)).toHaveLength(2);
    expect(screen.getByText(/19 BBY/i)).toBeInTheDocument();
    expect(screen.getByText(/Tatooine/i)).toBeInTheDocument();
    expect(screen.getByText(/Human/i)).toBeInTheDocument();
    expect(screen.getByText(/172 cm/i)).toBeInTheDocument();
    expect(screen.getByText(/77 kg/i)).toBeInTheDocument();
    expect(screen.getByText(/Blue/i)).toBeInTheDocument();
    expect(screen.getByText(/Male/i)).toBeInTheDocument();
    expect(screen.getByText(/Blond/i)).toBeInTheDocument();
    expect(screen.getByText(/Fair/i)).toBeInTheDocument();
  });
});
