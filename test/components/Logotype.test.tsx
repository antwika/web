import Logotype from '../../src/components/Logotype';
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Logotype", () => {
  it("can be rendered", () => {
    render(<Logotype />);
    const logotype = screen.getByTestId("logotype");
    expect(logotype).toBeInTheDocument();
  });
});
