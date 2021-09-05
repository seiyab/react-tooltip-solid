import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Tooltip from "src/Tooltip";
import TooltipListener from "src/TooltipListener";

describe("integration tests", () => {
  it("appears on hover", () => {
    render(
      <div role="test">
        <TooltipListener tooltip={<Tooltip>tooltip</Tooltip>}>
          content
        </TooltipListener>
      </div>
    );
    expect(screen.queryByText("tooltip")).not.toBeInTheDocument();

    userEvent.hover(screen.getByText("content"));
    expect(screen.getByText("tooltip")).toBeInTheDocument();

    userEvent.unhover(screen.getByText("content"));
    expect(screen.queryByText("tooltip")).not.toBeInTheDocument();
  });
});
