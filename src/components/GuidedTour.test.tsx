import { render, screen, fireEvent } from "@testing-library/react";
import { expect, it } from "vitest";
import GuidedTour from "./GuidedTour";
import { projects } from "../data/projects";
it("provides a complete manual walkthrough with no narration controls", () => {
  render(<GuidedTour project={projects[1]} />);
  fireEvent.click(
    screen.getByRole("button", { name: /Read project walkthrough/ }),
  );
  expect(screen.getByText(projects[1].tour[0].text)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
  expect(
    screen.queryByRole("button", { name: /narration|audio/i }),
  ).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Next" }));
  fireEvent.click(screen.getByRole("button", { name: "Next" }));
  expect(screen.getByText(projects[1].tour[2].text)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
  fireEvent.click(screen.getByRole("button", { name: /Close walkthrough/ }));
  expect(
    screen.queryByRole("region", { name: "Project walkthrough" }),
  ).not.toBeInTheDocument();
});
