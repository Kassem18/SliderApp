import { render, fireEvent } from "@testing-library/react";
import SliderRow from "../SliderRow";
import type { ImageItem } from "../../types";

describe("SliderRow", () => {
  const items: ImageItem[] = [
    { id: "1", title: "One", imageUrl: "url1", createdAt: 1 },
    { id: "2", title: "Two", imageUrl: "url2", createdAt: 2 },
  ];

  it("renders images passed as props", () => {
    const { getByAltText } = render(<SliderRow items={items} />);
    expect(getByAltText("One")).toBeInTheDocument();
    expect(getByAltText("Two")).toBeInTheDocument();
  });

  it("scrolls when navigation arrows are clicked", () => {
    const scrollByMock = jest.fn();
    (HTMLElement.prototype as any).scrollBy = scrollByMock;

    const { getByLabelText } = render(<SliderRow items={items} />);
    const right = getByLabelText("scroll-right");
    const left = getByLabelText("scroll-left");

    fireEvent.click(right);
    fireEvent.click(left);

    expect(scrollByMock).toHaveBeenCalledWith({
      left: 300,
      behavior: "smooth",
    });
    expect(scrollByMock).toHaveBeenCalledWith({
      left: -300,
      behavior: "smooth",
    });
  });

  it("renders cards with responsive width classes", () => {
    const { getByAltText } = render(<SliderRow items={items} />);
    const card = getByAltText("One").closest("div");
    expect(card).toHaveClass("w-40");
    // md:w-48 and lg:w-56 are part of the class list too
    expect(card).toHaveClass("md:w-48");
    expect(card).toHaveClass("lg:w-56");
  });
});
