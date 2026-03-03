import React from "react";
import UploadArea from "../components/UploadArea";
import SliderRow from "../components/SliderRow";
import { useImageStore } from "../hooks/useImageStore";

const HomePage: React.FC = () => {
  const { images, addImage, clear } = useImageStore();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-gray-900 dark:bg-gray-900 dark:text-white p-4 max-w-6xl mx-auto">
      <header className="mb-6 flex items-center justify-center w-full">
        <h1 className="text-3xl font-bold text-center">Slider App</h1>
      </header>

      <section className="mb-8">
        <UploadArea onAdd={addImage} />
      </section>

      {images.length > 0 && (
        <section className="mb-4">
          <SliderRow items={images} />
        </section>
      )}

      {images.length > 0 && (
        <button
          className="mt-8 mb-4 px-6 py-3 bg-gradient-to-r from-pink-400 to-pink-600 text-white rounded-lg shadow-lg hover:from-pink-500 hover:to-pink-700 transition-all hover:shadow-pink-500/50"
          onClick={clear}
          style={{padding: '12px 24px', marginTop: '23px'}}
        >
          Clear All
        </button>
      )}
    </div>
  );
};

export default HomePage;
