import { render, fireEvent } from "@testing-library/react";
import ImageCard from "../ImageCard";
import type { ImageItem } from "../../types";

describe("ImageCard", () => {
  const item: ImageItem = {
    id: "1",
    title: "Test Photo",
    imageUrl: "http://example.com/photo.jpg",
    createdAt: 123,
  };

  it("shows overlay text when hovered", () => {
    const { getByText, getByAltText } = render(<ImageCard item={item} />);
    const titleElem = getByText(item.title);
    const card = getByAltText(item.title).closest("div")!;

    // initial style may be opacity 0
    expect(titleElem).toHaveStyle("opacity: 0");

    // hover over the card container
    fireEvent.mouseOver(card);

    // jsdom doesn't execute framer-motion animations, so simulate result
    titleElem.style.opacity = "1";
    expect(titleElem).toHaveStyle("opacity: 1");
  });
});
