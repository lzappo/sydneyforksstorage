import { useRef } from "react";

/**
 * Hook for horizontal swipe detection on touch devices.
 * @param {Object} options
 * @param {() => void} [options.onSwipeLeft] - Called when user swipes left
 * @param {() => void} [options.onSwipeRight] - Called when user swipes right
 * @param {number} [options.minDistance=50] - Minimum swipe distance in px to trigger
 * @returns {{ onTouchStart: Function, onTouchEnd: Function }}
 */
export function useSwipe({ onSwipeLeft, onSwipeRight, minDistance = 50 }) {
  const touchStartX = useRef(null);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const deltaX = touchStartX.current - e.changedTouches[0].clientX;
    touchStartX.current = null;
    if (deltaX > minDistance) onSwipeLeft?.();
    else if (deltaX < -minDistance) onSwipeRight?.();
  };

  return { onTouchStart, onTouchEnd };
}
