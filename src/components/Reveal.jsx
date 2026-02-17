import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

export default function Reveal({ children }) {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, rootMargin: "0px 0px -30px 0px" });

  return (
    <div ref={ref} className={`reveal ${isVisible ? "reveal--visible" : ""}`}>
      {children}
    </div>
  );
}
