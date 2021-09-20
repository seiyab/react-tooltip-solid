import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AddTooltip from ".";

describe("AddTooltip", () => {
  it("appears on hover", () => {
    render(
      <AddTooltip tooltipContent="tooltip" event="hover">
        content
      </AddTooltip>
    );
    expect(screen.queryByText("tooltip")).not.toBeInTheDocument();

    userEvent.hover(screen.getByText("content"));
    expect(screen.getByText("tooltip")).toBeInTheDocument();

    userEvent.unhover(screen.getByText("content"));
    expect(screen.queryByText("tooltip")).not.toBeInTheDocument();
  });

  it("appears on click", () => {
    render(
      <AddTooltip tooltipContent="tooltip" event="click">
        content
      </AddTooltip>
    );
    expect(screen.queryByText("tooltip")).not.toBeInTheDocument();

    userEvent.click(screen.getByText("content"));
    expect(screen.getByText("tooltip")).toBeInTheDocument();

    userEvent.click(screen.getByText("tooltip"));
    expect(screen.getByText("tooltip")).toBeInTheDocument();

    userEvent.click(screen.getByText("content"));
    expect(screen.queryByText("tooltip")).not.toBeInTheDocument();
  });
});
