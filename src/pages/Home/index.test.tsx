import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
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
  test("renderiza título, cards e rodapé", () => {
    renderWithProviders(<Home />);

    expect(
      screen.getByText(/Welcome to the Data Viewer of/i)
    ).toBeInTheDocument();
    expect(screen.getAllByText(/Star Wars/i).length).toBeGreaterThan(0);

    expect(screen.getAllByText(/Characters/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Movies/i).length).toBeGreaterThan(0);

    expect(
      screen.getByText(/Discover the characters of Star Wars\./i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Discover the movies of Star Wars\./i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Developed by Lucas Ferreira/i)
    ).toBeInTheDocument();
  });

  test("links apontam para /characters e /movies", () => {
    renderWithProviders(<Home />);

    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThanOrEqual(2);

    const charactersLink = links.find(
      (a) => a.getAttribute("href") === "/characters"
    );
    const moviesLink = links.find((a) => a.getAttribute("href") === "/movies");

    expect(charactersLink).toBeTruthy();
    expect(moviesLink).toBeTruthy();
  });

  test("quando clicar em Characters navega para a rota /characters", async () => {
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

    const charactersText = screen.getAllByText(/Characters/i)[0];
    fireEvent.click(charactersText as HTMLElement);

    expect(screen.getByText(/Characters Page/i)).toBeInTheDocument();
  });
});
