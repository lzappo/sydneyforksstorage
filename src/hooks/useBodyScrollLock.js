import { useEffect } from "react";

/**
 * Locks body scroll when shouldLock is true (e.g. modal open, nav open).
 * Restores overflow on cleanup.
 * @param {boolean} shouldLock
 */
export function useBodyScrollLock(shouldLock) {
  useEffect(() => {
    if (shouldLock) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [shouldLock]);
}
