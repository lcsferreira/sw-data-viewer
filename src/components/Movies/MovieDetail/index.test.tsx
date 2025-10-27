import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "../../../context/ThemeContext";
import MovieDetail from "./index";

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
} as any;

function renderWithRoutes(ui: React.ReactElement) {
  return render(
    <ThemeProvider>
      <MemoryRouter initialEntries={["/movies/1"]}>
        <Routes>
          <Route path="/movies/:id" element={ui} />
          <Route path="/movies" element={<div>Movies List Page</div>} />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>
  );
}

describe("MovieDetail", () => {
  test("renderiza dados básicos e botão Back", () => {
    renderWithRoutes(
      <MovieDetail movie={sampleMovie} loading={false} movieId="1" />
    );

    expect(screen.getAllByText(/A New Hope/i)).toHaveLength(1);
    expect(screen.getByText(/George Lucas/i)).toBeInTheDocument();
    expect(screen.getByText(/Gary Kurtz, Rick McCallum/i)).toBeInTheDocument();
    expect(screen.getByText(/Episode/i)).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText(/Release Date/i)).toBeInTheDocument();
    expect(screen.getByText("25/05/1977")).toBeInTheDocument();
    expect(screen.getByText(/Back/i)).toBeInTheDocument();
  });

  test("abre e fecha o modal do crawl ao clicar Play/Stop", () => {
    renderWithRoutes(
      <MovieDetail movie={sampleMovie} loading={false} movieId="1" />
    );

    const playButton = screen.getByRole("button", { name: /Play/i });
    fireEvent.click(playButton);

    expect(screen.getByText(/Episode 4/i)).toBeInTheDocument();
    // expect(screen.getByText(/A New Hope/i)).toBeInTheDocument();
    // pegar o ultimo elemento da lista de textos
    const lastText = screen.getAllByText(/A New Hope/i)[1];
    expect(lastText).toBeInTheDocument();
    expect(
      screen.getByText(/It is a period of civil war/i)
    ).toBeInTheDocument();

    const stopButton = screen.getByRole("button", { name: /Stop/i });
    fireEvent.click(stopButton);

    // Modal fecha; título do modal não deve mais estar visível
    expect(screen.queryByText(/Episode 4/i)).toBeNull();
  });

  test("navega para /movies ao clicar em Back", () => {
    renderWithRoutes(
      <MovieDetail movie={sampleMovie} loading={false} movieId="1" />
    );

    const back = screen.getByText(/Back/i);
    fireEvent.click(back);

    expect(screen.getByText(/Movies List Page/i)).toBeInTheDocument();
  });
});
