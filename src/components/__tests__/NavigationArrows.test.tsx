import { render, fireEvent } from "@testing-library/react";
import NavigationArrows from "../NavigationArrows";

describe("NavigationArrows", () => {
  it("invokes callbacks on clicks", () => {
    const left = jest.fn();
    const right = jest.fn();
    const { getByLabelText } = render(
      <NavigationArrows onLeft={left} onRight={right} />,
    );

    fireEvent.click(getByLabelText("scroll-right"));
    fireEvent.click(getByLabelText("scroll-left"));

    expect(right).toHaveBeenCalled();
    expect(left).toHaveBeenCalled();
  });
});
