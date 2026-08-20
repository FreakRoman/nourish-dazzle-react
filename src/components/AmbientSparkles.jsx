import React from "react";
import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";

export default function AmbientSparkles() {
  return (
    <div className="ambient-sparkles">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 1.25]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        <Sparkles
          count={320}
          scale={[14, 30, 8]}
          size={1.35}
          speed={0.12}
          opacity={0.5}
          color="#f5f8dc"
        />
      </Canvas>
    </div>
  );
}
