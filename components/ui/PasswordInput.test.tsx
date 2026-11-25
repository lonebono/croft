import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PasswordInput } from "./PasswordInput";

const renderInput = () =>
  render(
    <PasswordInput
      name="password"
      placeholder="password"
      autoComplete="current-password"
    />,
  );

describe("PasswordInput", () => {
  it("starts masked with a show toggle", () => {
    renderInput();

    expect(screen.getByPlaceholderText("password")).toHaveAttribute(
      "type",
      "password",
    );
    expect(
      screen.getByRole("button", { name: "show password" }),
    ).toHaveAttribute("aria-pressed", "false");
  });

  it("reveals and re-masks on toggle", () => {
    renderInput();
    const input = screen.getByPlaceholderText("password");

    fireEvent.click(screen.getByRole("button", { name: "show password" }));
    expect(input).toHaveAttribute("type", "text");
    expect(
      screen.getByRole("button", { name: "hide password" }),
    ).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(screen.getByRole("button", { name: "hide password" }));
    expect(input).toHaveAttribute("type", "password");
  });

  it("keeps the typed value across toggles", () => {
    renderInput();
    const input = screen.getByPlaceholderText("password");

    fireEvent.change(input, { target: { value: "hunter2" } });
    fireEvent.click(screen.getByRole("button", { name: "show password" }));

    expect(input).toHaveValue("hunter2");
  });

  it("is required and passes the form name through", () => {
    renderInput();
    const input = screen.getByPlaceholderText("password");

    expect(input).toBeRequired();
    expect(input).toHaveAttribute("name", "password");
  });
});
