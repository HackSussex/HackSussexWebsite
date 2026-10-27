import { useEffect, useState } from "react";
import styles from "./leafBorder.module.css";
import { ReactComponent as Leaf } from "../../assets/misc/leaf.svg";

const DEFAULT_LEAF_SPACING = 250;
const ROTATION_RANGE = 50;
const BASE_ROTATION = 90;

// Deterministic pseudo-random helpers
const deterministicBetween = (index, min, max) => {
  const seed = Math.sin(index * 12.9898) * 43758.5453;
  const normalized = seed - Math.floor(seed);
  return min + (max - min) * normalized;
};

const deterministicLeafColor = (index) => {
  const lime = [139, 218, 148];
  const blue = [52, 152, 219];

  const t = deterministicBetween(index, 0, 1);
  const rgb = lime.map((c, i) => Math.round(c + (blue[i] - c) * t));

  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
};

const deterministicRotation = (index) => {
  const offset = deterministicBetween(index, 0, ROTATION_RANGE / 2);
  return BASE_ROTATION + (index % 2 === 0 ? offset : -offset);
};

const LeafBorder = ({ side = "left", spacing = DEFAULT_LEAF_SPACING }) => {
  const [leafCount, setLeafCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const pageHeight = document.documentElement.scrollHeight;
      const count = Math.ceil(pageHeight / spacing) + 2;
      setLeafCount(count);
    };

    // Observe real document height changes
    const observer = new ResizeObserver(updateCount);
    observer.observe(document.body);

    updateCount();

    window.addEventListener("resize", updateCount);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateCount);
    };
  }, [spacing]);

  return (
    <div
      className={`${styles.container} ${
        side === "right" ? styles.right : styles.left
      }`}
      aria-hidden
    >
      {Array.from({ length: leafCount }).map((_, i) => (
        <Leaf
          key={i}
          className={styles.leaf}
          style={{
            top: `${i * spacing}px`,
            transform: `
              rotate(${deterministicRotation(i)}deg)
              ${side === "right" ? "scaleY(-1)" : ""}
            `,
            color: deterministicLeafColor(i),
          }}
        />
      ))}
    </div>
  );
};

export default LeafBorder;
