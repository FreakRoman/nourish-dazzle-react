import React, { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  PerspectiveCamera,
  ContactShadows,
} from "@react-three/drei";
import FloatingModel from "./FloatingModel";

const BASE_URL = import.meta.env.BASE_URL || "/";
const assetPath = (path) => `${BASE_URL}${path}`;

const MODELS = {
  avocado: assetPath("models/food_avocado_01_1k.gltf/food_avocado_01_1k.gltf"),
  apple: assetPath("models/food_apple_01_1k.gltf/food_apple_01_1k.gltf"),
  kiwi: assetPath("models/food_kiwi_01_1k.gltf/food_kiwi_01_1k.gltf"),
  lime: assetPath("models/food_lime_01_1k.gltf/food_lime_01_1k.gltf"),
  pomegranate: assetPath("models/food_pomegranate_01_1k.gltf/food_pomegranate_01_1k.gltf"),
  celandine: assetPath("models/celandine_01_1k.gltf/celandine_01_1k.gltf"),
  nettle: assetPath("models/nettle_plant_1k.gltf/nettle_plant_1k.gltf"),
};

function FruitScene() {
  const group = useRef();
  const { size } = useThree();
  const mobile = size.width < 600;

  useFrame((state) => {
    if (!group.current) return;

    const targetX = state.pointer.y * 0.035;
    const targetY = state.pointer.x * 0.05;

    group.current.rotation.x +=
      (targetX - group.current.rotation.x) * 0.015;

    group.current.rotation.y +=
      (targetY - group.current.rotation.y) * 0.015;
  });

  const p = mobile
      ? {
        kiwi: [-0.95, 0.05, -0.9],
        lime: [0.85, -0.05, -1.0],
        avocado: [0.05, -0.95, 0],
        pomegranate: [-0.85, -1.75, -0.9],
        apple: [0.88, -1.7, -0.8],
      }
    : {
        kiwi: [0.95, 0.55, -0.6],
        lime: [2.6, 0.35, -0.9],
        avocado: [1.55, -0.35, 0],
        pomegranate: [1.0, -1.35, -0.8],
        apple: [2.75, -1.15, -0.75],
      };

  const extra = mobile
    ? {
        kiwi: [0.05, 1.0, -1.0],
        lime: [-1.05, -0.95, -1.05],
        avocado: [1.05, -1.45, -0.15],
        pomegranate: [0.9, -2.3, -1.0],
        apple: [-0.15, -2.0, -0.85],
        celandineTop: [0.9, 1.6, -1.25],
        nettle: [-1.3, 1.35, -1.15],
        celandineLow: [1.25, -2.45, -1],
      }
    : {
        kiwi: [1.8, 1.55, -0.95],
        lime: [3.55, 0.95, -1.1],
        avocado: [2.95, -0.85, -0.15],
        pomegranate: [1.9, -2.1, -1.0],
        apple: [4.0, -1.85, -0.9],
        celandineTop: [2.35, 1.95, -1.25],
        nettle: [4.1, 1.35, -1.2],
        celandineLow: [2.95, -2.35, -1],
      };

  return (
    <group ref={group}>
      <FloatingModel
        model={MODELS.kiwi}
        position={p.kiwi}
        rotation={[0.15, 0.35, -0.2]}
        scale={mobile ? 2.15 : 3}
        floatSpeed={0.65}
        rotationSpeed={0.12}
        drift={0.08}
      />

      <FloatingModel
        model={MODELS.lime}
        position={p.lime}
        rotation={[0.2, -0.3, 0.2]}
        scale={mobile ? 1.8 : 2.5}
        floatSpeed={0.75}
        rotationSpeed={0.15}
        drift={0.08}
      />

      {/* Your working avocado size is intentionally unchanged. */}
      <FloatingModel
        model={MODELS.avocado}
        position={p.avocado}
        rotation={[0.12, -0.35, 0.2]}
        scale={1.25}
        floatSpeed={0.45}
        rotationSpeed={0.09}
        drift={0.06}
      />

      <FloatingModel
        model={MODELS.pomegranate}
        position={p.pomegranate}
        rotation={[0.1, 0.3, -0.15]}
        scale={mobile ? 2.35 : 3.2}
        floatSpeed={0.6}
        rotationSpeed={0.11}
        drift={0.08}
      />

      <FloatingModel
        model={MODELS.apple}
        position={p.apple}
        rotation={[0.15, 0.3, 0.1]}
        scale={mobile ? 2.5 : 3.5}
        floatSpeed={0.65}
        rotationSpeed={0.13}
        drift={0.09}
      />

      <FloatingModel
        model={MODELS.celandine}
        position={mobile ? [-1.35, 0.9, -1.2] : [1.15, 1.15, -1.2]}
        rotation={[0.2, 0.3, -0.35]}
        scale={mobile ? 1.2 : 2.15}
        floatSpeed={0.48}
        rotationSpeed={0.08}
        drift={0.1}
      />
      <FloatingModel
        model={MODELS.nettle}
        position={mobile ? [1.25, 0.8, -1.1] : [3.05, 0.95, -1.1]}
        rotation={[0.1, -0.3, 0.25]}
        scale={mobile ? 1.08 : 1.95}
        floatSpeed={0.54}
        rotationSpeed={0.07}
        drift={0.1}
      />
      <FloatingModel
        model={MODELS.celandine}
        position={mobile ? [-0.95, -1.95, -1] : [1.45, -1.55, -1]}
        rotation={[0.3, 0.15, 0.4]}
        scale={mobile ? 0.92 : 1.55}
        floatSpeed={0.42}
        rotationSpeed={0.06}
        drift={0.08}
      />

      <FloatingModel
        model={MODELS.kiwi}
        position={extra.kiwi}
        rotation={[0.05, -0.2, 0.15]}
        scale={mobile ? 1.4 : 1.9}
        floatSpeed={0.52}
        rotationSpeed={0.1}
        drift={0.08}
      />
      <FloatingModel
        model={MODELS.lime}
        position={extra.lime}
        rotation={[0.18, 0.25, -0.18]}
        scale={mobile ? 1.25 : 1.75}
        floatSpeed={0.58}
        rotationSpeed={0.12}
        drift={0.08}
      />
      <FloatingModel
        model={MODELS.avocado}
        position={extra.avocado}
        rotation={[0.2, 0.1, -0.15]}
        scale={mobile ? 0.95 : 1.2}
        floatSpeed={0.4}
        rotationSpeed={0.08}
        drift={0.06}
      />
      <FloatingModel
        model={MODELS.pomegranate}
        position={extra.pomegranate}
        rotation={[0.08, -0.25, 0.22]}
        scale={mobile ? 1.6 : 2.3}
        floatSpeed={0.5}
        rotationSpeed={0.1}
        drift={0.08}
      />
      <FloatingModel
        model={MODELS.apple}
        position={extra.apple}
        rotation={[0.12, 0.28, -0.08]}
        scale={mobile ? 1.8 : 2.6}
        floatSpeed={0.56}
        rotationSpeed={0.11}
        drift={0.08}
      />

      <FloatingModel
        model={MODELS.celandine}
        position={extra.celandineTop}
        rotation={[0.18, -0.15, 0.28]}
        scale={mobile ? 0.95 : 1.8}
        floatSpeed={0.45}
        rotationSpeed={0.08}
        drift={0.1}
      />
      <FloatingModel
        model={MODELS.nettle}
        position={extra.nettle}
        rotation={[0.08, 0.2, -0.2]}
        scale={mobile ? 0.9 : 1.55}
        floatSpeed={0.5}
        rotationSpeed={0.07}
        drift={0.1}
      />
      <FloatingModel
        model={MODELS.celandine}
        position={extra.celandineLow}
        rotation={[0.28, -0.1, 0.36]}
        scale={mobile ? 0.82 : 1.35}
        floatSpeed={0.38}
        rotationSpeed={0.06}
        drift={0.08}
      />
    </group>
  );
}

function SceneLighting() {
  return (
    <>
      <ambientLight intensity={1.35} />
      <directionalLight
        position={[4, 7, 6]}
        intensity={3}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight
        position={[-4, 3, 4]}
        intensity={1.1}
      />
      <pointLight
        position={[0, 1, 4]}
        intensity={0.9}
      />
    </>
  );
}

function CameraController() {
  const camera = useThree((state) => state.camera);
  const { size } = useThree();
  const mobile = size.width < 600;

  useFrame(() => {
    // Use a close camera so the fruit becomes a bold hero visual.
    const targetZ = mobile ? 4.8 : 3.8;
    const targetFov = mobile ? 46 : 39;

    camera.position.z += (targetZ - camera.position.z) * 0.03;
    camera.fov += (targetFov - camera.fov) * 0.03;
    camera.updateProjectionMatrix();
  });

  return null;
}

export default function Hero3D() {
  return (
    <div className="hero-background-3d">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 4.2]} fov={43} />
        <CameraController />
        <SceneLighting />

        <Suspense fallback={null}>
          <Environment preset="studio" environmentIntensity={0.55} />
          <FruitScene />

          <ContactShadows
            position={[0, -3.25, 0]}
            opacity={0.18}
            scale={8}
            blur={2.8}
            far={5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
