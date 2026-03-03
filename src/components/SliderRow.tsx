import React, { useRef, useState } from "react";
import type { PointerEvent, WheelEvent } from "react";
import { motion } from "framer-motion";
import ImageCard from "./ImageCard";
import type { ImageItem } from "../types";

interface SliderRowProps {
  items: ImageItem[];
}

const SliderRow: React.FC<SliderRowProps> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      e.preventDefault();
      containerRef.current.scrollLeft += e.deltaY;
    }
  };

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      setIsDragging(true);
      e.currentTarget.setPointerCapture(e.pointerId);
      setStartX(e.pageX - containerRef.current.offsetLeft);
      setScrollLeft(containerRef.current.scrollLeft);
    }
  };

  const handlePointerLeave = (e: PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      setIsDragging(false);
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      setIsDragging(false);
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // scroll-fastness
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="relative w-full">
      <motion.div
        ref={containerRef}
        className="flex space-x-4 overflow-x-auto p-4 cursor-grab select-none scrollbar-hide"
        onPointerDown={handlePointerDown}
        onPointerLeave={handlePointerLeave}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        onWheel={handleWheel}
        whileTap={{ cursor: "grabbing" }}
      >
        {items.map((item) => (
          <ImageCard key={item.id} item={item} />
        ))}
      </motion.div>
    </div>
  );
};

export default SliderRow;
