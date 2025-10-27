import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CharacterCard from "./index";
import { ThemeProvider } from "../../../context/ThemeContext";

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

function renderWithRouter(ui: React.ReactElement) {
  return render(
    <ThemeProvider>
      <MemoryRouter initialEntries={["/characters"]}>{ui}</MemoryRouter>
    </ThemeProvider>
  );
}

describe("CharacterCard", () => {
  test("renderiza campos formatados e link correto", () => {
    renderWithRouter(
      <CharacterCard character={sampleCharacter as any} loading={false} />
    );

    // Título e descrição repetem o nome
    expect(
      screen.getAllByText(/Luke Skywalker/i).length
    ).toBeGreaterThanOrEqual(1);

    // Campos formatados via helpers
    expect(screen.getByText(/19 BBY/i)).toBeInTheDocument();
    expect(screen.getByText(/172 cm/i)).toBeInTheDocument();
    expect(screen.getByText(/77 kg/i)).toBeInTheDocument();
    expect(screen.getByText(/Blue/i)).toBeInTheDocument();
    expect(screen.getByText(/Blond/i)).toBeInTheDocument();
    expect(screen.getByText(/Male/i)).toBeInTheDocument();

    const links = screen.getAllByRole("link");
    const detailsLink = links.find(
      (a) => a.getAttribute("href") === "/characters/1"
    );
    expect(detailsLink).toBeTruthy();
  });

  test("navega para detalhes ao clicar no card", () => {
    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={["/characters"]}>
          <Routes>
            <Route
              path="/characters"
              element={
                <CharacterCard
                  character={sampleCharacter as any}
                  loading={false}
                />
              }
            />
            <Route
              path="/characters/:id"
              element={<div>Character Details Page</div>}
            />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    );

    fireEvent.click(screen.getAllByText(/Luke Skywalker/i)[0]);
    expect(screen.getByText(/Character Details Page/i)).toBeInTheDocument();
  });
});
