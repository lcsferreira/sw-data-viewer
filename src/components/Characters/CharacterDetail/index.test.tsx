import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CharacterDetail from "./index";

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

const character = {
  name: "Luke Skywalker",
  height: "172",
  mass: "77",
  hair_color: "blond",
  birth_year: "19BBY",
  created: "2014-12-09T13:50:51.644000Z",
  edited: "2014-12-20T21:17:56.891000Z",
  eye_color: "blue",
  films: [],
  gender: "male",
  homeworld: "https://swapi.dev/api/planets/1/",
  skin_color: "fair",
  species: [],
  starships: [],
  vehicles: [],
  url: "https://swapi.dev/api/people/1/",
};

describe("CharacterDetail", () => {
  it("should render character name", () => {
    render(
      <MemoryRouter>
        <CharacterDetail character={character} loading={false} />
      </MemoryRouter>
    );

    // Verify if the character name is in the document, no matter how many times it appears
    const characterNames = screen.getAllByText("Luke Skywalker");

    // Check that there is at least one element with the text "Luke Skywalker"
    expect(characterNames.length).toBeGreaterThan(0);
  });

  it("should render character image", () => {
    render(
      <MemoryRouter>
        <CharacterDetail character={character} loading={false} />
      </MemoryRouter>
    );

    const characterImage = screen.getByAltText("Luke Skywalker");
    expect(characterImage).toBeInTheDocument();
    expect(characterImage).toHaveAttribute("src", `/characters/1.jpg`);
  });

  it("should render character details", () => {
    render(
      <MemoryRouter>
        <CharacterDetail character={character} loading={false} />
      </MemoryRouter>
    );

    const characterBirthYearLabel = screen.getByText("Ano de nascimento");
    expect(characterBirthYearLabel).toBeInTheDocument();

    const characterBirthYear = screen.getByText("19BBY");
    expect(characterBirthYear).toBeInTheDocument();

    const characterHomeworldLabel = screen.getByText("Nasceu em");
    expect(characterHomeworldLabel).toBeInTheDocument();

    const characterHomeworld = screen.getByText(
      "https://swapi.dev/api/planets/1/"
    );
    expect(characterHomeworld).toBeInTheDocument();
  });
});
