import React, {
  Suspense,
  useMemo,
  useState,
} from "react";

import {
  Canvas,
} from "@react-three/fiber";

import {
  Environment,
  Float,
  PerspectiveCamera,
  Sparkles,
  useGLTF,
} from "@react-three/drei";

import {
  useNavigate,
} from "react-router-dom";

import {
  useAuth,
} from "../context/AuthContext.jsx";

import "../login.css";


/* =========================================
   SAME PATH SYSTEM AS YOUR HERO3D.JSX
========================================= */

const BASE_URL =
  import.meta.env.BASE_URL || "/";


const assetPath = (path) =>
  `${BASE_URL}${path}`;


const MODELS = {

  avocado: assetPath(
    "models/food_avocado_01_1k.gltf/food_avocado_01_1k.gltf"
  ),

  apple: assetPath(
    "models/food_apple_01_1k.gltf/food_apple_01_1k.gltf"
  ),

  kiwi: assetPath(
    "models/food_kiwi_01_1k.gltf/food_kiwi_01_1k.gltf"
  ),

};


/* =========================================
   FRUIT
========================================= */

function LoginFruit({
  model,
  position,
  rotation,
  scale,
}) {

  const {
    scene,
  } = useGLTF(model);


  const clonedScene =
    useMemo(() => {

      const clone =
        scene.clone(true);


      clone.traverse(
        (child) => {

          if (
            child.isMesh
          ) {

            child.castShadow =
              true;

            child.receiveShadow =
              true;

          }

        }
      );


      return clone;

    }, [scene]);


  return (

    <Float

      speed={1.1}

      rotationIntensity={0.22}

      floatIntensity={0.38}

      floatingRange={[
        -0.15,
        0.15,
      ]}

    >

      <primitive

        object={
          clonedScene
        }

        position={
          position
        }

        rotation={
          rotation
        }

        scale={
          scale
        }

      />

    </Float>

  );
}


/* =========================================
   LOGIN 3D SCENE
========================================= */

function LoginScene() {

  return (

    <Canvas

      shadows

      dpr={[
        1,
        1.35,
      ]}

      gl={{

        alpha: true,

        antialias: true,

        powerPreference:
          "high-performance",

      }}

    >

      <PerspectiveCamera

        makeDefault

        position={[
          0,
          0,
          6.5,
        ]}

        fov={46}

      />


      {/* LIGHT */}

      <ambientLight
        intensity={1.2}
      />


      <directionalLight

        position={[
          4,
          6,
          5,
        ]}

        intensity={3}

      />


      <directionalLight

        position={[
          -4,
          2,
          4,
        ]}

        intensity={1.4}

        color="#d7e99f"

      />


      <pointLight

        position={[
          0,
          0,
          4,
        ]}

        intensity={0.8}

        color="#fff5d6"

      />


      <Environment

        preset="studio"

        environmentIntensity={0.6}

      />


      {/* SPARKLES */}

      <Sparkles

        count={150}

        scale={[
          10,
          10,
          6,
        ]}

        size={1.25}

        speed={0.12}

        opacity={0.5}

        color="#f8f7d9"

      />


      <Suspense fallback={null}>

        {/* KIWI */}

        <LoginFruit

          model={
            MODELS.kiwi
          }

          position={[
            -2.45,
            1.55,
            -0.7,
          ]}

          rotation={[
            0.15,
            0.35,
            -0.2,
          ]}

          scale={1.45}

        />


        {/* AVOCADO */}

        <LoginFruit

          model={
            MODELS.avocado
          }

          position={[
            2.5,
            1.25,
            -0.8,
          ]}

          rotation={[
            0.15,
            -0.35,
            0.2,
          ]}

          scale={0.9}

        />


        {/* APPLE */}

        <LoginFruit

          model={
            MODELS.apple
          }

          position={[
            2.4,
            -1.65,
            -0.9,
          ]}

          rotation={[
            0.1,
            0.3,
            0.15,
          ]}

          scale={1.05}

        />

      </Suspense>

    </Canvas>

  );
}


/* =========================================
   LOGIN
========================================= */

export default function Login() {

  const navigate =
    useNavigate();


  const {
    login,
  } = useAuth();


  const [
    email,
    setEmail,
  ] = useState("");


  const [
    password,
    setPassword,
  ] = useState("");


  const [
    showPassword,
    setShowPassword,
  ] = useState(false);


  const [
    error,
    setError,
  ] = useState("");


  const [
    loading,
    setLoading,
  ] = useState(false);


  /* =======================================
     DEMO ACCOUNT
  ======================================= */

  const fillDemo = (
    role
  ) => {

    const accounts = {

      owner: {
        email:
          "owner@nourish.com",

        password:
          "123456",
      },

      coach: {
        email:
          "coach@nourish.com",

        password:
          "123456",
      },

      customer: {
        email:
          "customer@nourish.com",

        password:
          "123456",
      },

    };


    const account =
      accounts[role];


    if (!account) {
      return;
    }


    setEmail(
      account.email
    );


    setPassword(
      account.password
    );


    setError("");

  };


  /* =======================================
     SUBMIT
  ======================================= */

  const handleSubmit =
    async (
      event
    ) => {

      event.preventDefault();


      setError("");

      setLoading(true);


      try {

        const result =
          await Promise.resolve(
            login(
              email.trim(),
              password
            )
          );


        if (
          !result ||
          !result.success
        ) {

          setError(

            result?.message ||

            "We couldn't find an account with those details."

          );

          return;

        }


        const role =
          result.user.role;


        if (
          role === "owner"
        ) {

          navigate(
            "/owner"
          );

        }

        else if (
          role === "coach"
        ) {

          navigate(
            "/coach"
          );

        }

        else if (
          role === "customer"
        ) {

          navigate(
            "/customer"
          );

        }

        else {

          setError(
            "This account does not have a valid role."
          );

        }

      }

      finally {

        setLoading(
          false
        );

      }

    };


  return (

    <div className="nourish-login">


      {/* =================================
          3D BACKGROUND
      ================================= */}

      <div
        className="login-visual"
        aria-hidden="true"
      >

        <LoginScene />

      </div>


      {/* =================================
          HEADER
      ================================= */}

      <header
        className="login-topbar"
      >

        <button

          type="button"

          className="login-brand"

          onClick={() =>
            navigate("/")
          }

        >

          <span
            className="
              login-brand-mark
            "
          >
            ◒
          </span>


          <span>
            Nourish
          </span>

        </button>


        <button

          type="button"

          className="back-home"

          onClick={() =>
            navigate("/")
          }

        >

          <span>
            ←
          </span>

          Back to website

        </button>

      </header>


      {/* =================================
          LOGIN CARD
      ================================= */}

      <main
        className="login-center"
      >

        <section
          className="login-card"
        >


          {/* TOP */}

          <div
            className="
              login-card-top
            "
          >

            <span
              className="
                login-kicker
              "
            >

              YOUR WELLNESS
              JOURNEY

            </span>


            <div
              className="
                login-status
              "
            >

              <span />

              Nourish is better together

            </div>

          </div>


          {/* HEADING */}

          <div
            className="
              login-heading
            "
          >

            <h1>

              Welcome

              <br />

              <em>
                back.
              </em>

            </h1>


            <p>

              Your meals,
              your progress,
              your people —
              everything in
              one nourishing place.

            </p>

          </div>


          {/* FORM */}

          <form
            className="
              login-form
            "
            onSubmit={
              handleSubmit
            }
          >

            {/* EMAIL */}

            <label
              htmlFor="email"
            >

              Email address

            </label>


            <div
              className="
                input-wrap
              "
            >

              <span
                className="
                  input-icon
                "
              >
                ✦
              </span>


              <input

                id="email"

                type="email"

                autoComplete="email"

                value={email}

                onChange={(
                  event
                ) =>
                  setEmail(
                    event.target.value
                  )
                }

                placeholder="
                  you@example.com
                "

                required

              />

            </div>


            {/* PASSWORD */}

            <label
              htmlFor="password"
            >

              Password

            </label>


            <div
              className="
                input-wrap
              "
            >

              <span
                className="
                  input-icon
                "
              >
                ⌁
              </span>


              <input

                id="password"

                type={
                  showPassword
                    ? "text"
                    : "password"
                }

                autoComplete="
                  current-password
                "

                value={
                  password
                }

                onChange={(
                  event
                ) =>
                  setPassword(
                    event.target.value
                  )
                }

                placeholder="
                  Enter your password
                "

                required

              />


              <button

                type="button"

                className="
                  password-toggle
                "

                onClick={() =>
                  setShowPassword(
                    (value) =>
                      !value
                  )
                }

              >

                {showPassword
                  ? "Hide"
                  : "Show"}

              </button>

            </div>


            {/* ERROR */}

            {error && (

              <div
                className="
                  login-error
                "
              >

                <span>
                  !
                </span>


                {error}

              </div>

            )}


            {/* SUBMIT */}

            <button

              type="submit"

              className="
                login-submit
              "

              disabled={
                loading
              }

            >

              <span>

                {loading
                  ? "Entering Nourish..."
                  : "Continue"}

              </span>


              <strong>
                →
              </strong>

            </button>

          </form>


          {/* DEMO */}

          <div
            className="
              login-divider
            "
          >

            <span>
              DEMO ACCESS
            </span>

          </div>


          <div
            className="
              demo-access
            "
          >

            <button
              type="button"
              onClick={() =>
                fillDemo(
                  "owner"
                )
              }
            >

              <span
                className="
                  demo-icon
                "
              >
                O
              </span>

              Owner

            </button>


            <button
              type="button"
              onClick={() =>
                fillDemo(
                  "coach"
                )
              }
            >

              <span
                className="
                  demo-icon
                "
              >
                C
              </span>

              Coach

            </button>


            <button
              type="button"
              onClick={() =>
                fillDemo(
                  "customer"
                )
              }
            >

              <span
                className="
                  demo-icon
                "
              >
                U
              </span>

              Customer

            </button>

          </div>


          <p
            className="
              login-footer
            "
          >

            Demo access is for
            the UI prototype only.

          </p>

        </section>

      </main>


      {/* =================================
          FOOTER TEXT
      ================================= */}

      <div
        className="
          login-bottom-copy
        "
      >

        <span>
          Eat better.
        </span>


        <em>
          Feel electric.
        </em>

      </div>

    </div>
  );
}