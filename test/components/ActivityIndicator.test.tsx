import ActivityIndicator from '../../src/components/ActivityIndicator';
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("ActivityIndicator", () => {
  it("can be rendered", () => {
    render(<ActivityIndicator />);
    const activityIndicator = screen.getByTestId("activity-indicator");
    expect(activityIndicator).toBeInTheDocument();
  });
});
