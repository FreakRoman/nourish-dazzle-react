import React, { useEffect, useState } from "react";
import "../yukthaahara-intro.css";

export default function YukthaaharaIntro() {
  const [visible, setVisible] = useState(true);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const closeTimer = window.setTimeout(() => setClosing(true), 1850);
    const removeTimer = window.setTimeout(() => setVisible(false), 2500);
    return () => {
      window.clearTimeout(closeTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`yukthaahara-intro ${closing ? "intro-closing" : ""}`} aria-label="Yukthaahara">
      <div className="intro-aura" />

      <div className="brand-word" aria-hidden="true">
        {"Yukthaahara".split("").map((letter, index) => (
          <span key={`${letter}-${index}`}>{letter}</span>
        ))}
      </div>

      <div className="intro-leaf-scene" aria-hidden="true">
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
          <span className="stem-branch branch-left" />
          <span className="stem-branch branch-right" />
          <span className="stem-branch branch-left-small" />
          <span className="stem-branch branch-right-small" />
          <span className="stem-tip" />
        </div>
      </div>
    </div>
  );
}
