import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fashionImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=2070&q=80",
    alt: "Fashion model in elegant outfit",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "A man in glasses",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=2070&q=80",
    alt: "Eco-friendly wool fashion",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1623446713256-599eecb668ac?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZhc2hpb24lMjBzdG9yZXxlbnwwfHwwfHx8MA%3D%3D",
    alt: "Sustainable clothing display",
  },
];

const ImageCarousel = () => {
  const [current, setCurrent] = useState(0);

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrent((prev) => (prev === fashionImages.length - 1 ? 0 : prev + 1));
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? fashionImages.length - 1 : prev - 1));
  };

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval); // Clean up on component unmount
  }, []);

  return (
    <section className="text-center my-4">
      <div className="position-relative" style={{ height: "300px", overflow: "hidden" }}>
        <AnimatePresence>
          <motion.img
            key={fashionImages[current].id}
            src={fashionImages[current].url}
            alt={fashionImages[current].alt}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6 }}
            className="img-fluid w-100"
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover", // Ensures the image covers the entire container
              borderRadius: "12px",
            }}
          />
        </AnimatePresence>

        {/* Controls */}
        
      </div>

      {/* Optional: Thumbnails or indicators */}
      <div className="mt-3 d-flex justify-content-center gap-2">
        {fashionImages.map((img, index) => (
          <button
            key={img.id}
            className={`rounded-circle border-0 ${index === current ? "bg-dark" : "bg-secondary"}`}
            style={{ width: "10px", height: "10px" }}
            onClick={() => setCurrent(index)}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default ImageCarousel;
