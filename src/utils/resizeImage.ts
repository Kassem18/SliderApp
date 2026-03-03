export function resizeImage(
  file: File,
  maxWidth = 1280,
  maxHeight = 720,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      if (typeof e.target?.result !== "string") {
        reject(new Error("Unable to read file"));
        return;
      }
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);

    img.onload = () => {
      let { width, height } = img;
      const aspect = width / height;

      if (width > maxWidth) {
        width = maxWidth;
        height = Math.round(width / aspect);
      }
      if (height > maxHeight) {
        height = maxHeight;
        width = Math.round(height * aspect);
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas not supported"));
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL(file.type));
    };

    img.onerror = reject;
  });
}
