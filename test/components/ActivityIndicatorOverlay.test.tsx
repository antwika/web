import ActivityIndicatorOverlay from '../../src/components/ActivityIndicatorOverlay';
import "@testing-library/jest-dom";
import { within, render, screen } from "@testing-library/react";

describe("ActivityIndicatorOverlay", () => {
  it("can be rendered", () => {
    render(<ActivityIndicatorOverlay />);
    const activityIndicatorOverlay = screen.getByTestId("activity-indicator-overlay");
    expect(activityIndicatorOverlay).toBeInTheDocument();
    const { getByTestId } = within(activityIndicatorOverlay);
    const activityIndicator = getByTestId('activity-indicator');
    expect(activityIndicator).toBeInTheDocument();
  });
});
