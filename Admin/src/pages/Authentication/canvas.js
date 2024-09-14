import React, { useEffect } from "react";

const ParticleCanvas = () => {
  useEffect(() => {
    // Add any additional initialization or customization for the canvas here
    // For example, you may want to initialize particles.js library or add event listeners

    // Make sure to clean up any resources when the component is unmounted
    return () => {
      // Perform cleanup actions if needed
    };
  }, []); // Empty dependency array ensures that the effect runs only once after the initial render

  return (
    <canvas
      className="particles-js-canvas-el"
      width="1841"
      height="475"
      style={{ width: "100%", height: "100%" }}
    ></canvas>
  );
};

export default ParticleCanvas;
