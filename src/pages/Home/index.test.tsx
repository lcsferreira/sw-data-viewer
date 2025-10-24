import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "../../context/ThemeContext";
import { Home } from "./index";

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
      <MemoryRouter initialEntries={["/"]}>{ui}</MemoryRouter>
    </ThemeProvider>
  );
}

describe("Home page", () => {
  test("Renderiza título, cards e rodapé", () => {
    renderWithProviders(<Home />);

    // Título principal
    expect(
      screen.getByText(/Welcome to the Data Viewer of/i)
    ).toBeInTheDocument();
    expect(screen.getAllByText(/Star Wars/i).length).toBeGreaterThan(0);

    // Dois cards de categoria
    expect(screen.getAllByText(/Characters/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Movies/i).length).toBeGreaterThan(0);

    // Descrições dos cards
    expect(
      screen.getByText(/Discover the characters of Star Wars\./i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Discover the movies of Star Wars\./i)
    ).toBeInTheDocument();

    // Rodapé
    expect(
      screen.getByText(/Developed by Lucas Ferreira/i)
    ).toBeInTheDocument();
  });

  test("Links apontam para /characters e /movies", () => {
    renderWithProviders(<Home />);

    const links = screen.getAllByRole("link");
    // Deve haver pelo menos dois links (um para cada card)
    expect(links.length).toBeGreaterThanOrEqual(2);

    const charactersLink = links.find(
      (a) => a.getAttribute("href") === "/characters"
    );
    const moviesLink = links.find((a) => a.getAttribute("href") === "/movies");

    expect(charactersLink).toBeTruthy();
    expect(moviesLink).toBeTruthy();
  });

  test("Ao clicar em Characters navega para a rota /characters", async () => {
    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/characters" element={<div>Characters Page</div>} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    );

    // Clica no card/Link de Characters
    const charactersText = screen.getAllByText(/Characters/i)[0];
    fireEvent.click(charactersText as HTMLElement);

    // Valida a navegação
    expect(screen.getByText(/Characters Page/i)).toBeInTheDocument();
  });
});
