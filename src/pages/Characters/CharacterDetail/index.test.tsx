import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "../../../context/ThemeContext";
import CharacterDetails from "./index";
import { useQuery } from "@tanstack/react-query";

jest.mock("../../../api/services/characters", () => ({
  __esModule: true,
  getCharacter: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  __esModule: true,
  useQuery: jest.fn().mockImplementation(({ queryKey }) => {
    const key = Array.isArray(queryKey) ? queryKey[0] : queryKey;
    if (key === "homeworld") {
      return { data: { name: "Tatooine" }, isLoading: false, error: null };
    }
    if (key === "species") {
      return { data: [{ name: "Human" }], isLoading: false, error: null };
    }
    return {};
  }),
}));

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
  initialEntry: string = "/characters/1"
) {
  return render(
    <ThemeProvider>
      <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
          <Route path="/characters/:id" element={ui} />
          <Route path="/characters" element={<div>Characters List Page</div>} />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>
  );
}

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

describe("CharacterDetails page", () => {
  beforeEach(() => {
    (useQuery as unknown as jest.Mock).mockReset();
  });

  test("mostra Spinner quando carregando e sem personagem", async () => {
    (useQuery as unknown as jest.Mock).mockImplementation(({ queryKey }) => {
      const key = Array.isArray(queryKey) ? queryKey[0] : queryKey;
      if (key === "character") {
        return { data: null, isLoading: true, error: null };
      }
      return {};
    });

    const { container } = renderWithRoutes(<CharacterDetails />);

    // Spinner do Antd deve aparecer enquanto loading e character nulo
    expect(container.querySelector(".ant-spin")).toBeInTheDocument();
  });

  test("renderiza detalhes quando o personagem é carregado", async () => {
    (useQuery as unknown as jest.Mock).mockImplementation(({ queryKey }) => {
      const key = Array.isArray(queryKey) ? queryKey[0] : queryKey;
      if (key === "character") {
        return { data: sampleCharacter, isLoading: false, error: null };
      }
      if (key === "homeworld") {
        return { data: { name: "Tatooine" }, isLoading: false, error: null };
      }
      if (key === "species") {
        return { data: [{ name: "Human" }], isLoading: false, error: null };
      }
      return {};
    });

    renderWithRoutes(<CharacterDetails />);

    expect(await screen.findAllByText(/Luke Skywalker/i)).toHaveLength(2);

    expect(screen.getByText(/19 BBY/i)).toBeInTheDocument();
    expect(screen.getByText(/Tatooine/i)).toBeInTheDocument();
    expect(screen.getByText(/Human/i)).toBeInTheDocument();
  });

  test("exibe mensagem de erro quando getCharacter lança exceção", async () => {
    (useQuery as unknown as jest.Mock).mockImplementation(({ queryKey }) => {
      const key = Array.isArray(queryKey) ? queryKey[0] : queryKey;
      if (key === "character") {
        return {
          data: null,
          isLoading: false,
          error: "Erro ao carregar personagem",
        };
      }
      return {};
    });

    renderWithRoutes(<CharacterDetails />);

    expect(
      await screen.findAllByText(/Erro ao carregar personagem/i)
    ).toHaveLength(1);
  });

  test("ao clicar em Back, navega para /characters", async () => {
    (useQuery as unknown as jest.Mock).mockImplementation(({ queryKey }) => {
      const key = Array.isArray(queryKey) ? queryKey[0] : queryKey;
      if (key === "character") {
        return { data: sampleCharacter, isLoading: false, error: null };
      }
      if (key === "homeworld") {
        return { data: { name: "Tatooine" }, isLoading: false, error: null };
      }
      if (key === "species") {
        return { data: [{ name: "Human" }], isLoading: false, error: null };
      }
      return {};
    });

    renderWithRoutes(<CharacterDetails />);

    expect(await screen.findAllByText(/Luke Skywalker/i)).toHaveLength(2);

    const links = screen.getAllByRole("link");
    const backLink = links.find(
      (a) => a.getAttribute("href") === "/characters"
    );
    expect(backLink).toBeTruthy();
    fireEvent.click(backLink as HTMLElement);

    expect(
      await screen.findByText(/Characters List Page/i)
    ).toBeInTheDocument();
  });
});
