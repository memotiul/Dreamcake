import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const ImageSlider = () => {
  const [slides, setSlides] = useState([]);
  const [secondColumnImages, setSecondColumnImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [nextImage, setNextImage] = useState(1);
  const controls = useAnimation();
  const previewControls = useAnimation();

  // Fetch images from API
  const fetchImages = async () => {
    try {
      const response = await fetch("/api/allTableImage");
      const data = await response.json();

      // Assuming data is an array of image URLs
      setSlides(data.slice(0, Math.ceil(data.length / 2))); // Set first half for first column
      setSecondColumnImages(data.slice(Math.ceil(data.length / 2))); // Set second half for second column
    } catch (error) {
      console.error("Failed to load images", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    if (slides.length === 0 || secondColumnImages.length === 0) return; // Exit if no images are loaded

    const sequence = async () => {
      await controls.start({
        scale: 1.5,
        opacity: 1,
        transition: { duration: 5 },
      });
      await controls.start({
        scale: 3,
        opacity: 0,
        transition: { duration: 5 },
      });
      setCurrentImage(nextImage);
      setNextImage((prev) => (prev + 1) % slides.length);
      controls.start({ scale: 1, opacity: 1, transition: { duration: 5 } });
    };

    sequence();
    const interval = setInterval(sequence, 8000); // Adjust the interval for your timing

    return () => clearInterval(interval);
  }, [controls, slides, nextImage, secondColumnImages]);

  if (slides.length === 0 || secondColumnImages.length === 0)
    return <div>Loading...</div>;

  const getImagePath = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("/images/")) {
      return imagePath;
    }
    return `/images/${imagePath}`;
  };

  return (
    <>
      <div className="flex flex-col ">
        {/* First Column */}
        <div
          style={{
            display: "flex",

            overflow: "hidden",
            border: "2px solid #ccc", // Border between images
          }}
          className="w-[85vw] h-[30vh]  md:w-[45vw]"
        >
          {" "}
          <div style={{ flex: 1, position: "relative" }}>
            <img
              src={getImagePath(slides[currentImage])}
              alt="Left Side"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <motion.div
            animate={controls}
            style={{
              flex: 1,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <img
              src={getImagePath(slides[(currentImage + 1) % slides.length])}
              alt="Middle"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </motion.div>
          <div style={{ flex: 1, position: "relative" }}>
            <motion.img
              animate={previewControls}
              src={getImagePath(slides[(nextImage + 1) % slides.length])}
              alt="Preview"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Second Column */}
        <div
          style={{
            display: "flex",

            overflow: "hidden",
            border: "2px solid #ccc", // Border between images
          }}
          className="w-[85vw] h-[30vh]  md:w-[45vw]"
        >
          <div style={{ flex: 1, position: "relative" }}>
            <img
              src={getImagePath(secondColumnImages[currentImage])}
              alt="Left Side"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <motion.div
            animate={controls}
            style={{
              flex: 1,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <img
              src={getImagePath(
                secondColumnImages[
                  (currentImage + 1) % secondColumnImages.length
                ]
              )}
              alt="Middle"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </motion.div>
          <div style={{ flex: 1, position: "relative" }}>
            <motion.img
              animate={previewControls}
              src={getImagePath(
                secondColumnImages[(nextImage + 1) % secondColumnImages.length]
              )}
              alt="Preview"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageSlider;
