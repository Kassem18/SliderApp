import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import App from "../App";

jest.mock("../utils/resizeImage", () => ({
  resizeImage: jest.fn(() => Promise.resolve("data:image/mock")),
}));

describe("App integration", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("uploads an image and displays it in slider", async () => {
    render(<App />);

    const file = new File(["dummy"], "photo.jpg", { type: "image/jpeg" });
    const fileInput = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    Object.defineProperty(fileInput, "files", {
      value: [file],
    });
    fireEvent.change(fileInput);

    await waitFor(() => {
      expect(screen.getByAltText("photo.jpg")).toBeInTheDocument();
    });

    // persist in localStorage
    expect(
      JSON.parse(localStorage.getItem("slider_images") || "[]")[0].title,
    ).toBe("photo.jpg");

    // navigation arrow should attempt to scroll when clicked
    const scrollByMock = jest.fn();
    // directly assign so we don't rely on spyOn when the property is undefined
    (HTMLElement.prototype as any).scrollBy = scrollByMock;
    const rightArrow = screen.getByLabelText("scroll-right");
    fireEvent.click(rightArrow);
    expect(scrollByMock).toHaveBeenCalled();
  });
});
