import Button from '../../../src/components/ui/Button';
import "@testing-library/jest-dom";
import { within, render, screen } from "@testing-library/react";

describe("Button", () => {
  it("can be instantiated with default props", () => {
    render(<Button>My button</Button>);
    const button = screen.getByTestId("ui-button");
    expect(button).toBeInTheDocument();
    button.click();
  });

  it("can clicked and onClick callback is called", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>My button</Button>);
    const button = screen.getByTestId("ui-button");
    expect(button).toBeInTheDocument();
    button.click();
    expect(onClick).toHaveBeenCalledTimes(1);
    const { getByText } = within(button);
    expect(getByText('My button')).toBeInTheDocument();
  });
});
