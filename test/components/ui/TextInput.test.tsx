import TextInput from '../../../src/components/ui/TextInput';
import "@testing-library/jest-dom";
import { within, render, screen, fireEvent } from "@testing-library/react";

describe("TextInput", () => {
  it("defaults to 'text' type", () => {
    render(<TextInput />);
    const textInput = screen.getByTestId("ui-text-input");
    expect(textInput).toBeInTheDocument();
    expect(textInput).toHaveAttribute('type', 'text');
  });

  it("can is enabled by default", () => {
    render(<TextInput />);
    const textInput = screen.getByTestId("ui-text-input");
    expect(textInput).toBeInTheDocument();
    expect(textInput).not.toBeDisabled();
  });

  it("can be disabled", () => {
    render(<TextInput disabled />);
    const textInput = screen.getByTestId("ui-text-input");
    expect(textInput).toBeInTheDocument();
    expect(textInput).toBeDisabled();
  });

  it("does not have any default placeholder", () => {
    render(<TextInput />);
    const textInput = screen.getByTestId("ui-text-input");
    expect(textInput).toBeInTheDocument();
    expect(textInput).toHaveAttribute('placeholder', '');
  });

  it("can have a customized placeholder", () => {
    render(<TextInput placeholder='Test placeholder' />);
    const textInput = screen.getByTestId("ui-text-input");
    expect(textInput).toBeInTheDocument();
    expect(textInput).toHaveAttribute('placeholder', 'Test placeholder');
  });

  it("can be clicked and the onClick callback is invoked", () => {
    render(<TextInput type='text' placeholder='Test placeholder' label='Test label' />);
    const textInput = screen.getByTestId("ui-text-input");
    expect(textInput).toBeInTheDocument();
    expect(textInput).not.toBeDisabled();
    fireEvent.change(textInput, { target: { value: 'Example text' } });
    expect(textInput).toHaveValue('Example text');
  });
});
