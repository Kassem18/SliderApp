import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { DragEvent, ChangeEvent } from "react";
import type { ImageItem } from "../types";
import { generateId } from "../utils/generateId";
import { resizeImage } from "../utils/resizeImage";

interface UploadAreaProps {
  onAdd: (item: ImageItem) => void;
}

const UploadArea: React.FC<UploadAreaProps> = ({ onAdd }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach((file) => {
      // resize image before handing off, keeps desktop/slider friendly size
      resizeImage(file).then((resized) => {
        onAdd({
          id: generateId(),
          title: file.name,
          imageUrl: resized,
          createdAt: Date.now(),
        });
      });
    });
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  return (
    <motion.div
      className={`
        relative cursor-pointer ${!isDragging ? "group" : ""}
        flex flex-col items-center justify-center
        w-full max-w-4xl mx-auto p-12
        rounded-2xl
        transition-[background-color,box-shadow] duration-300 ease-out
        backdrop-blur-sm outline-none
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      animate={{ scale: isDragging ? 1.03 : 1 }}
      whileHover={isDragging ? {} : { scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) =>
        (e.key === "Enter" || e.key === " ") && fileInputRef.current?.click()
      }
    >
      <div className="text-center pointer-events-none space-y-2">
        <h3 className="text-xl font-bold text-white tracking-wide">
          Upload Photos
        </h3>
        <p className="text-sm text-gray-400 group-hover:text-pink-200 transition-colors">
          Drag & drop or click to upload
        </p>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleChange}
      />
    </motion.div>
  );
};

export default UploadArea;
