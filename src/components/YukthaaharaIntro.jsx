import React, { useEffect, useState } from "react";
import "../yukthaahara-intro.css";

export default function YukthaaharaIntro() {
  const [visible, setVisible] = useState(true);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const closeTimer = setTimeout(() => {
      setClosing(true);
    }, 1800);

    const removeTimer = setTimeout(() => {
      setVisible(false);
    }, 2450);

    return () => {
      clearTimeout(closeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div
      className={`yukthaahara-intro ${
        closing ? "intro-closing" : ""
      }`}
      aria-label="Yukthaahara"
    >
                <div className="brand-word">
          <span>Y</span>
          <span>u</span>
          <span>k</span>
          <span>t</span>
          <span>h</span>
          <span>a</span>
          <span>a</span>
          <span>h</span>
          <span>a</span>
          <span>r</span>
          <span>a</span>
        </div>
      <div className="intro-aura" />

      <div className="intro-leaf-scene">

        <div className="leaf-glow" />

        <div className="leaf leaf-left">
          <span className="leaf-vein vein-main" />
          <span className="leaf-vein vein-one" />
          <span className="leaf-vein vein-two" />
          <span className="leaf-vein vein-three" />
        </div>

        <div className="leaf leaf-right">
          <span className="leaf-vein vein-main" />
          <span className="leaf-vein vein-one" />
          <span className="leaf-vein vein-two" />
          <span className="leaf-vein vein-three" />
        </div>

        <div className="plant-stem">

            <span className="stem-highlight" />
            <span className="stem-tip" />

        </div>
      </div>
    </div>
  );
}