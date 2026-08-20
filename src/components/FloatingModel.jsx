import React, { forwardRef, useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const FloatingObject = forwardRef(function FloatingObject(
  { object, position, rotation, scale, floatSpeed, rotationSpeed, drift },
  ref
) {
  const previous = useRef(0);

  useFrame((state) => {
    if (!ref.current) return;

    const elapsed = state.clock.elapsedTime;
    const t = elapsed * floatSpeed;
    const delta = Math.min(elapsed - previous.current, 0.05);
    previous.current = elapsed;

    ref.current.position.y = position[1] + Math.sin(t) * drift;
    ref.current.rotation.x = rotation[0] + Math.sin(t * 0.45) * 0.06;
    ref.current.rotation.y += delta * rotationSpeed;
    ref.current.rotation.z = rotation[2] + Math.cos(t * 0.35) * 0.05;
  });

  return (
    <primitive
      ref={ref}
      object={object}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  );
});

export default function FloatingModel({
  model,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  floatSpeed = 1,
  rotationSpeed = 0.15,
  drift = 0.08,
}) {
  const ref = useRef();
  const { scene } = useGLTF(model);

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);

    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) child.material.needsUpdate = true;
      }
    });

    return clone;
  }, [scene]);

  return (
    <FloatingObject
      ref={ref}
      object={clonedScene}
      position={position}
      rotation={rotation}
      scale={scale}
      floatSpeed={floatSpeed}
      rotationSpeed={rotationSpeed}
      drift={drift}
    />
  );
}
