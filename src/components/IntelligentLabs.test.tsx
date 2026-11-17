import { render, screen, fireEvent } from "@testing-library/react";
import { expect, it } from "vitest";
import { WeatherLab, NeuralLab } from "./IntelligentLabs";
it("updates the offline certainty-factor model and resets both evidence inputs", () => {
  render(<WeatherLab engineering />);
  fireEvent.change(screen.getByRole("slider", { name: /Rule A support/ }), {
    target: { value: "1" },
  });
  expect(
    screen.getByRole("status", { name: "Combined certainty factor" }),
  ).toHaveTextContent("1.00");
  fireEvent.click(screen.getByRole("button", { name: "Reset simulation" }));
  expect(screen.getByRole("slider", { name: /Rule A support/ })).toHaveValue(
    "0.4",
  );
  expect(
    screen.getByRole("status", { name: "Combined certainty factor" }),
  ).toHaveTextContent("0.70");
});
it("updates the binary inputs and resets the perceptron output", () => {
  render(<NeuralLab engineering />);
  fireEvent.click(screen.getByRole("button", { name: /Input A/ }));
  expect(screen.getByRole("status", { name: "AND output" })).toHaveTextContent(
    "0",
  );
  fireEvent.click(screen.getByRole("button", { name: /Input B/ }));
  expect(screen.getByRole("status", { name: "AND output" })).toHaveTextContent(
    "1",
  );
  fireEvent.click(screen.getByRole("button", { name: "Reset simulation" }));
  expect(screen.getByRole("status", { name: "AND output" })).toHaveTextContent(
    "0",
  );
});
