import { createContext, useContext, useEffect, useState } from "react";

const TextSizeContext = createContext(null);
const SIZES = ["sm", "md", "lg"];

export function TextSizeProvider({ children }) {
  const [size, setSize] = useState(() => localStorage.getItem("pc_text_size") || "md");

  useEffect(() => {
    document.documentElement.setAttribute("data-text-size", size);
    localStorage.setItem("pc_text_size", size);
  }, [size]);

  function step(direction) {
    const idx = SIZES.indexOf(size);
    const nextIdx = Math.min(SIZES.length - 1, Math.max(0, idx + direction));
    setSize(SIZES[nextIdx]);
  }

  function setDirectSize(newSize) {
    if (SIZES.includes(newSize)) {
      setSize(newSize);
    }
  }

  return (
    <TextSizeContext.Provider
      value={{
        size,
        increase: () => step(1),
        decrease: () => step(-1),
        reset: () => setDirectSize("md"),
        setSize: setDirectSize,
      }}
    >
      {children}
    </TextSizeContext.Provider>
  );
}

export function useTextSize() {
  const ctx = useContext(TextSizeContext);
  if (!ctx) throw new Error("useTextSize must be used within TextSizeProvider");
  return ctx;
}
