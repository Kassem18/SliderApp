import { useState, useEffect, useCallback } from "react";
import type { ImageItem } from "../types";

const STORAGE_KEY = "slider_images";

export function useImageStore() {
  const [images, setImages] = useState<ImageItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setImages(JSON.parse(stored));
      } catch {
        setImages([]);
      }
    }
  }, []);

  const save = useCallback((items: ImageItem[]) => {
    setImages(items);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, []);

  const addImage = useCallback((item: ImageItem) => {
    setImages((prevImages) => {
      const updated = [...prevImages, item];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clear = useCallback(() => {
    save([]);
  }, [save]);

  return { images, addImage, clear };
}
