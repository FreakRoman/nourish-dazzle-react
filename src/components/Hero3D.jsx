import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

/* =========================
   LEAF
========================= */

function Leaf({
  position,
  scale = 1,
  rotation = [0, 0, 0],
  speed = 1,
}) {
  const ref = useRef();

  const leafShape = useMemo(() => {
    const shape = new THREE.Shape();

    shape.moveTo(0, 0);

    shape.bezierCurveTo(
      0.35,
      0.5,
      0.85,
      0.65,
      1.15,
      0
    );

    shape.bezierCurveTo(
      0.85,
      -0.65,
      0.35,
      -0.5,
      0,
      0
    );

    return shape;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;

    const time = state.clock.elapsedTime * speed;

    ref.current.rotation.x =
      rotation[0] + Math.sin(time * 0.7) * 0.35;

    ref.current.rotation.y =
      rotation[1] + Math.cos(time * 0.5) * 0.35;

    ref.current.rotation.z =
      rotation[2] + Math.sin(time * 0.8) * 0.45;

    ref.current.position.y =
      position[1] + Math.sin(time) * 0.15;
  });

  return (
    <mesh
      ref={ref}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <shapeGeometry args={[leafShape]} />

      <meshStandardMaterial
        color="#3f722d"
        roughness={0.7}
        metalness={0}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}


/* =========================
   FRUIT
========================= */

function Fruit({
  type,
  position,
  scale = 1,
  speed = 1,
}) {
  const ref = useRef();

  const colors = {
    apple: "#c84d3e",
    orange: "#e49a35",
    lemon: "#e7c84b",
    lime: "#7fae3b",
    blueberry: "#526fa8",
  };

  useFrame((state) => {
    if (!ref.current) return;

    const time = state.clock.elapsedTime * speed;

    ref.current.rotation.x += 0.002 * speed;
    ref.current.rotation.y += 0.004 * speed;

    ref.current.position.y +=
      Math.sin(time) * 0.0015;
  });

  const isSmall = type === "blueberry";

  return (
    <Float
      speed={0.7}
      rotationIntensity={0.35}
      floatIntensity={0.6}
    >
      <group
        ref={ref}
        position={position}
        scale={scale}
      >

        {/* Fruit body */}
        <mesh>
          <sphereGeometry
            args={[
              isSmall ? 0.22 : 0.42,
              32,
              32,
            ]}
          />

          <meshPhysicalMaterial
            color={colors[type]}
            roughness={0.28}
            metalness={0}
            clearcoat={0.8}
            clearcoatRoughness={0.2}
          />
        </mesh>

        {/* Small stem */}
        {!isSmall && (
          <mesh position={[0, 0.42, 0]}>
            <cylinderGeometry
              args={[0.025, 0.035, 0.18, 10]}
            />

            <meshStandardMaterial
              color="#4d3522"
            />
          </mesh>
        )}

        {/* Small leaf on fruit */}
        {!isSmall && (
          <mesh
            position={[0.1, 0.47, 0]}
            rotation={[0.2, 0, -0.5]}
            scale={0.18}
          >
            <sphereGeometry
              args={[1, 12, 8]}
            />

            <meshStandardMaterial
              color="#47752f"
            />
          </mesh>
        )}

      </group>
    </Float>
  );
}


/* =========================
   FLOATING NATURE
========================= */

function FloatingNature() {

  const leaves = useMemo(
    () => [
      // LEFT
      {
        position: [-2.5, 1.5, -0.5],
        scale: 0.55,
        rotation: [0.3, 0.2, -0.5],
        speed: 0.7,
      },

      {
        position: [-2.0, 0.3, -1],
        scale: 0.42,
        rotation: [0.5, 0.3, 0.8],
        speed: 1,
      },

      {
        position: [-2.6, -1.2, -0.5],
        scale: 0.65,
        rotation: [0.8, 0.2, 0.6],
        speed: 0.8,
      },

      // TOP
      {
        position: [-0.9, 1.9, -1],
        scale: 0.4,
        rotation: [0.3, 0.7, 0.2],
        speed: 1.1,
      },

      {
        position: [0.6, 2.0, -1.5],
        scale: 0.5,
        rotation: [0.6, 0.3, 0.4],
        speed: 0.9,
      },

      {
        position: [1.7, 1.6, -0.8],
        scale: 0.65,
        rotation: [0.2, 0.8, 0.7],
        speed: 0.7,
      },

      // RIGHT
      {
        position: [2.5, 1.0, -1],
        scale: 0.48,
        rotation: [0.4, 0.2, 1],
        speed: 1,
      },

      {
        position: [2.3, -0.2, -0.5],
        scale: 0.6,
        rotation: [0.8, 0.4, 0.3],
        speed: 0.75,
      },

      {
        position: [2.4, -1.4, -1],
        scale: 0.45,
        rotation: [0.2, 0.5, 0.8],
        speed: 1.1,
      },

      // CENTER / BACKGROUND
      {
        position: [-0.7, -1.7, -2],
        scale: 0.35,
        rotation: [0.7, 0.2, 0.5],
        speed: 0.8,
      },

      {
        position: [0.8, -1.6, -2],
        scale: 0.4,
        rotation: [0.4, 0.6, 0.3],
        speed: 0.9,
      },
    ],
    []
  );

  return (
    <>
      {leaves.map((leaf, index) => (
        <Float
          key={`leaf-${index}`}
          speed={0.8}
          rotationIntensity={0.25}
          floatIntensity={0.5}
        >
          <Leaf {...leaf} />
        </Float>
      ))}

      {/* =========================
          FRUITS
      ========================= */}

      <Fruit
        type="apple"
        position={[-2.1, 1.1, -1]}
        scale={0.7}
        speed={0.7}
      />

      <Fruit
        type="orange"
        position={[2.0, 1.25, -1]}
        scale={0.7}
        speed={0.9}
      />

      <Fruit
        type="lemon"
        position={[-2.1, -0.8, -1]}
        scale={0.65}
        speed={0.8}
      />

      <Fruit
        type="lime"
        position={[2.2, -0.8, -1]}
        scale={0.6}
        speed={1}
      />

      <Fruit
        type="orange"
        position={[0.9, 1.7, -2]}
        scale={0.42}
        speed={1.1}
      />

      <Fruit
        type="blueberry"
        position={[-0.9, -1.5, -1]}
        scale={1}
        speed={1.2}
      />

      <Fruit
        type="blueberry"
        position={[1.1, -1.5, -1]}
        scale={0.9}
        speed={1}
      />
    </>
  );
}


/* =========================
   SCENE
========================= */

function Scene() {

  const group = useRef();

  useFrame((state) => {

    if (!group.current) return;

    const targetX = state.pointer.y * 0.05;
    const targetY = state.pointer.x * 0.05;

    group.current.rotation.x +=
      (targetX - group.current.rotation.x) * 0.02;

    group.current.rotation.y +=
      (targetY - group.current.rotation.y) * 0.02;
  });

  return (
    <group ref={group}>
      <FloatingNature />
    </group>
  );
}


/* =========================
   HERO 3D
========================= */

export default function Hero3D() {

  return (
    <div className="hero-background-3d">

      <Canvas
        camera={{
          position: [0, 0, 6.5],
          fov: 45,
        }}
        dpr={[1, 1.5]}
      >

        <ambientLight intensity={1.6} />

        <directionalLight
          position={[4, 5, 5]}
          intensity={2.5}
        />

        <pointLight
          position={[-4, -2, 3]}
          intensity={1.5}
          color="#d5ef9b"
        />

        <pointLight
          position={[4, 1, 2]}
          intensity={1.2}
          color="#b8d879"
        />

        <Scene />

        <Environment preset="studio" />

      </Canvas>

    </div>
  );
}