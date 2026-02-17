import { useState, useEffect, useRef } from "react";

/**
 * Observes an element and returns whether it's visible in the viewport.
 * @param {Object} options
 * @param {number} [options.threshold=0.1]
 * @param {string} [options.rootMargin="0px 0px -30px 0px"]
 * @returns {[React.RefObject, boolean]} [ref, isVisible]
 */
export function useIntersectionObserver({ threshold = 0.1, rootMargin = "0px 0px -30px 0px" } = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, isVisible];
}
