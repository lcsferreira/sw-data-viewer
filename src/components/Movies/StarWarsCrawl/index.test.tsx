import React from "react";
import { render, screen } from "@testing-library/react";
import StarWarsCrawl from "./index";

describe("StarWarsCrawl", () => {
  test("exibe modal com textos quando animate=true", () => {
    render(
      <StarWarsCrawl
        animate={true}
        title="A New Hope"
        episode={4}
        text="It is a period of civil war..."
        close={() => {}}
      />
    );

    expect(screen.getByText(/Episode 4/i)).toBeInTheDocument();
    expect(screen.getByText(/A New Hope/i)).toBeInTheDocument();
    expect(
      screen.getByText(/It is a period of civil war/i)
    ).toBeInTheDocument();
  });

  test("não renderiza conteúdo quando animate=false", () => {
    render(
      <StarWarsCrawl
        animate={false}
        title="A New Hope"
        episode={4}
        text="It is a period of civil war..."
        close={() => {}}
      />
    );

    expect(screen.queryByText(/Episode 4/i)).toBeNull();
  });
});
