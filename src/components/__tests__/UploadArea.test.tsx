import { render, fireEvent, waitFor } from "@testing-library/react";
import UploadArea from "../UploadArea";

// mock resizing so test isn't dependent on canvas
jest.mock("../../utils/resizeImage", () => ({
  resizeImage: jest.fn(() => Promise.resolve("data:image/mock")),
}));

describe("UploadArea", () => {
  it("calls onAdd when files are selected", async () => {
    const mockAdd = jest.fn();
    const { container } = render(<UploadArea onAdd={mockAdd} />);

    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    const file = new File(["test data"], "test.png", { type: "image/png" });

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(
      () => {
        expect(mockAdd).toHaveBeenCalledWith(
          expect.objectContaining({
            title: "test.png",
            imageUrl: "data:image/mock",
          }),
        );
      },
      { timeout: 2000 },
    );
  });
});
