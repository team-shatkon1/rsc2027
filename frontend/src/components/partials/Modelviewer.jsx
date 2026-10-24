import React, { useRef, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const ModelViewer = ({
  modelPath,
  scale = 1,
  position = [0, 0, 0],
  mobileScale = 0.5,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
    };
    handleResize(); // Check on initial load
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const Model = () => {
    const { scene } = useGLTF(modelPath);
    return (
      <primitive
        object={scene}
        scale={isMobile ? mobileScale : scale}
        position={position}
      />
    );
  };

  const DancingModel = () => {
    const { scene } = useGLTF(modelPath);
    const modelRef = useRef();

    useFrame(({ clock }) => {
      const t = clock.getElapsedTime();
      if (modelRef.current) {
        modelRef.current.rotation.y = Math.sin(t) * 1.05;
        modelRef.current.position.y = position[0] + Math.sin(t * 1.5) * 0.003;
      }
    });

    return (
      <primitive
        ref={modelRef}
        object={scene}
        scale={isMobile ? mobileScale : scale}
        position={position}
      />
    );
  };

  return (
    <div className="flex items-center justify-center w-full h-[50vh] lg:h-[45vh]">
      <Canvas camera={{ position: [0, 1.5, 3] }}>
        <ambientLight intensity={1} />
        <directionalLight position={[0, 4, 5]} intensity={2} />
        <Suspense fallback={null}>
          <DancingModel />
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default ModelViewer;