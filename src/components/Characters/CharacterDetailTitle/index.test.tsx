import React from "react";
import { render, screen } from "@testing-library/react";
import CharacterDetailTitle from "./index";

describe("CharacterDetailTitle", () => {
  test("renderiza o nome duas vezes (título e Aurebesh)", () => {
    render(<CharacterDetailTitle characterName="Luke Skywalker" />);
    expect(screen.getAllByText(/Luke Skywalker/i).length).toBe(2);
  });
});
